
# Multi-Agent Blog Writing System - Crew AI

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)

## 🚀 Overview

![multi agent blog writer.png](<multi agent blog writer.png>)

The **Multi-Agent Blog Writing System (Crew AI)** is an innovative project that utilizes cutting-edge technologies to automate the process of creating well-researched, human-like blogs. This system is designed to bridge the gap between AI automation and human creativity by incorporating the latest advancements in **Agentic AI**.

This project features a **multi-agent architecture** that autonomously plans, writes, and edits blog posts, ensuring they are accurate, engaging, and up-to-date with the latest trends.


https://github.com/user-attachments/assets/9475289e-5e7a-4cc3-99c9-6ca01b7fb11a

---

## 📁 Project Structure

```
multi-agent/
│
├── client/
│   └── bloggpt/          # Next.js frontend for blog generation
│       ├── pages/        # Next.js pages
│       ├── components/   # Reusable React components
│       ├── actions/      # API calls to the FastAPI backend
│       ├── tailwind.config.js
│       ├── package.json
│       └── ...
│
│── crewai.ipynb      # Jupyter Notebook with FastAPI server and AI logic
│── requirements.txt  # Python dependencies
│── ...
```

---

## 🌟 Features

- **Planner Agent**: Structures and strategizes blog content based on the input query.
- **Writer Agent**: Generates the blog content using the **Gemini 2.0-Flash-EXP** LLM.
- **Editor Agent**: Refines the content for clarity, engagement, and accuracy.
- **Integration with Serper Web Search**: Fetches the latest information and trends.
- **FastAPI Backend**: Handles blog generation requests.
- **Next.js Frontend**: Provides a sleek user interface for input and blog display.
- **End-to-End Automation**: Delivers a complete, polished blog with references.

---

## ⚙️ Technologies Used

### Backend
- **CREW AI**: For Creating multi agent system.
- **FastAPI**: For serving the AI-powered blog generation API.
- **Python**: For scripting and implementation.
- **LangChain**: For managing multi-agent workflows.
- **Gemini 2.0-Flash-EXP**: As the language model powering the system.
- **Serper Web Search Tool**: To gather real-time data and trends.

### Frontend
- **Next.js**: For building the client-side application.
- **React**: For creating dynamic UI components.
- **Tailwind CSS**: For styling.
- **Shadcn  UI**: Components.

---

## 🛠 Installation

### Backend Setup (FastAPI Server)
1. **Install Dependencies**:
   Ensure Python 3.8+ is installed. Install the required Python libraries:
   ```bash
   pip install -r server/requirements.txt
   ```

2. **Run the FastAPI Server**:
   Open the `crewai.ipynb` notebook and run the cells to start the FastAPI server.
   - **Server URL**: `http://127.0.0.1:8002`

---

### Frontend Setup (Next.js)
1. **Navigate to the Frontend Directory**:
   ```bash
   cd client/bloggpt
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Frontend URL**: `http://localhost:3000`

---

## 🧠 How It Works

1. **User Input**: The user enters a topic through the Next.js frontend.
2. **API Request**: The frontend sends a POST request to the FastAPI server running at `http://127.0.0.1:8002/generate-blog/`.
3. **Blog Generation**:
   - The FastAPI server processes the request using `crewai.ipynb`.
   - The AI agents (Planner, Writer, Editor) collaboratively generate a polished blog.
4. **Response**: The FastAPI server returns the generated blog in Markdown format.
5. **Frontend Rendering**:
   - The blog is rendered using `ReactMarkdown` with proper Markdown styling.

---

## 🎯 Use Cases

- **Content Marketing**: Automate blog creation for businesses and brands.
- **Research Documentation**: Generate research summaries or articles with minimal effort.
- **Trend Analysis**: Create content based on the latest trends in various domains.

---

## 📝 Future Enhancements

- **Multi-modal Capabilities**: Incorporate image and video generation.
- **Advanced Customization**: Enable user-specific writing styles.
- **Workflow Orchestration**: Add support for managing multiple blogs simultaneously.

---

## 🌐 Contact

For questions or collaboration, feel free to connect:

- **Author**: Abdul Basit
- **GitHub**: [Abdulbasit110](https://github.com/Abdulbasit110)
- **LinkedIn**: [Abdul Basit](https://www.linkedin.com/in/abdul-basit-231204255/)

---

**Elevating AI creativity—one blog at a time! 🌟**

--- 

