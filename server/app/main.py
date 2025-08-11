from __future__ import annotations

import os
from typing import Any, Dict

from dotenv import load_dotenv, find_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yaml

from crewai import Agent, Task, Crew, LLM
from crewai_tools import SerperDevTool


# Simple config loader (YAML + env overrides)
DEFAULT_CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "config", "config.yaml")


def load_config(path: str = DEFAULT_CONFIG_PATH) -> Dict[str, Any]:
    load_dotenv()  # Load .env from current or parent dirs
    load_dotenv(find_dotenv(), override=False)

    config = {}
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            config = yaml.safe_load(f) or {}

    # Required env validation
    missing = []
    if not os.getenv("GOOGLE_API_KEY"):
        missing.append("GOOGLE_API_KEY")
    if not os.getenv("SERPER_API_KEY"):
        missing.append("SERPER_API_KEY")
    if missing:
        raise RuntimeError(f"Missing environment variables: {', '.join(missing)}")

    # Defaults with overrides
    app_cfg = config.get("app", {})
    llm_cfg = config.get("llm", {})
    crew_cfg = config.get("crew", {})

    return {
        "host": app_cfg.get("host", "127.0.0.1"),
        "port": app_cfg.get("port", 8002),
        "cors_origins": app_cfg.get("cors_origins", ["http://localhost:3000", "http://127.0.0.1:3000"]),
        "llm_model": llm_cfg.get("model", "gemini/gemini-2.0-flash-exp"),
        "crew_verbose": crew_cfg.get("verbose", True),
    }


# FastAPI app
app = FastAPI()

# Load config early
settings = load_config()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings["cors_origins"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TopicRequest(BaseModel):
    topic: str


# Crew builder (unchanged from notebook)
def build_crew() -> Crew:
    llm = LLM(
        api_key=os.getenv("GOOGLE_API_KEY"),
        model=settings["llm_model"],
    )

    os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY", "")
    search_tool = SerperDevTool()

    planner = Agent(
        role="Content Planner",
        goal="Plan engaging and factually accurate content on {topic}",
        backstory=(
            "You're working on planning a blog article about the topic: {topic} in 'https://medium.com/'. "
            "You collect information that helps the audience learn something and make informed decisions. "
            "Prepare a detailed outline and the relevant topics and sub-topics for the blog post. "
            "Your work is the basis for the Content Writer."
        ),
        allow_delegation=False,
        verbose=settings["crew_verbose"],
        llm=llm,
        tools=[search_tool],
    )

    writer = Agent(
        role="Content Writer",
        goal="Write insightful and factually accurate opinion piece about the topic: {topic}",
        backstory=(
            "You're writing a new opinion piece about the topic: {topic} in 'https://medium.com/'. "
            "You base your writing on the Content Planner's outline, provide objective insights, and "
            "acknowledge when statements are opinions."
        ),
        allow_delegation=False,
        verbose=settings["crew_verbose"],
        llm=llm,
    )

    editor = Agent(
        role="Editor",
        goal=(
            "Edit a given blog post to align with the writing style of the organization 'https://medium.com/'."
        ),
        backstory=(
            "You review the blog post to ensure journalistic best practices, balanced viewpoints, and avoidance "
            "of major controversial topics when possible."
        ),
        allow_delegation=False,
        verbose=settings["crew_verbose"],
        llm=llm,
    )

    plan_task = Task(
        description=(
            "1. Prioritize the latest trends, key players, and noteworthy news on {topic}.\n"
            "2. Identify the target audience, considering their interests and pain points.\n"
            "3. Develop a detailed content outline including an introduction, key points, and a call to action.\n"
            "4. Include SEO keywords and relevant data or sources."
        ),
        expected_output=(
            "A comprehensive content plan with outline, audience analysis, SEO keywords, and resources."
        ),
        agent=planner,
        tools=[search_tool],
    )

    write_task = Task(
        description=(
            "1. Use the content plan to craft a compelling blog post on {topic}.\n"
            "2. Incorporate SEO keywords naturally.\n"
            "3. Sections/Subtitles are properly named in an engaging manner.\n"
            "4. Ensure the post has an engaging introduction, insightful body, and a summarizing conclusion.\n"
            "5. Proofread for grammatical errors and alignment with the brand's voice."
        ),
        expected_output=(
            "A well-written blog post in markdown format, ready for publication, with 2-3 paragraphs per section."
        ),
        agent=writer,
    )

    edit_task = Task(
        description=(
            "Proofread the given blog post for grammatical errors and alignment with the brand's voice."
        ),
        expected_output=(
            "A well-written blog post in markdown format (no leading word 'markdown'), ready for publication, "
            "with 2-3 paragraphs per section."
        ),
        agent=editor,
    )

    return Crew(
        agents=[planner, writer, editor],
        tasks=[plan_task, write_task, edit_task],
        verbose=settings["crew_verbose"],
    )


# Store crew in app state at startup
@app.on_event("startup")
def startup() -> None:
    app.state.crew = build_crew()


@app.post("/generate-blog/")
async def generate_blog(request: TopicRequest) -> Dict[str, Any]:
    if not request.topic or not request.topic.strip():
        raise HTTPException(status_code=400, detail="'topic' must be provided")

    crew = app.state.crew
    try:
        result = crew.kickoff(inputs={"topic": request.topic.strip()})
        blog_text = getattr(result, "raw", None) or str(result)
        return {"topic": request.topic, "blog": {"raw": blog_text}}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


