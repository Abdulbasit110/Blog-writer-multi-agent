

# Multi-Agent Blog Writing System - Crew AI

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)

## 🚀 Overview

![multi agent blog writer.png](<multi agent blog writer.png>)


The **Multi-Agent Blog Writing System (Crew AI)** is an innovative project that utilizes cutting-edge technologies to automate the process of creating well-researched, human-like blogs. This system is designed to bridge the gap between AI automation and human creativity by incorporating the latest advancements in **Agentic AI**.

This project features a **multi-agent architecture** that autonomously plans, writes, and edits blog posts, ensuring they are accurate, engaging, and up-to-date with the latest trends.


## 📁 Project Structure


multi-agent/
│
├── .gitignore       # Specifies files and directories ignored by Git
├── crew.ipynb       # Jupyter Notebook containing the core implementation
├── requirements.txt # Python dependencies for the project


### Core Components

1. **`crew.ipynb`**: The implementation of the multi-agent system, including the Planner, Writer, and Editor agents.
2. **`requirements.txt`**: A list of all Python libraries and dependencies required to run the system.
3. **`.gitignore`**: Configuration to ignore unnecessary files during version control.

## 🌟 Features

- **Planner Agent**: Structures and strategizes blog content based on the input query.
- **Writer Agent**: Generates the blog content using the **Gemini 2.0-Flash-EXP** LLM.
- **Editor Agent**: Refines the content for clarity, engagement, and accuracy.
- **Integration with Serper Web Search**: Fetches the latest information and trends.
- **End-to-End Automation**: Delivers a complete, polished blog with references.

## ⚙️ Technologies Used

- **LangChain**: For managing multi-agent workflows.
- **Gemini 2.0-Flash-EXP**: As the language model powering the system.
- **Serper Web Search Tool**: To gather real-time data and trends.
- **Python**: For scripting and implementation.
- **Jupyter Notebook**: For development and demonstration.

## 🛠 Installation

To set up and run the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdulbasit110/Blog-writer-multi-agent
   cd crew.ipynb
   ```

2. **Install dependencies:**
   Ensure you have Python 3.8+ installed. Then, run:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the notebook:**
   Open `crew.ipynb` in Jupyter Notebook or Jupyter Lab and execute the cells.

## 🧠 How It Works

1. **Input Query**: The user provides a topic or query.
2. **Planning**: The Planner Agent structures the content using the Serper Web Search Tool.
3. **Writing**: The Writer Agent generates a detailed blog draft with the help of the Gemini LLM.
4. **Editing**: The Editor Agent refines the draft to ensure quality and accuracy.
5. **Output**: A complete blog post is generated, including references to the latest information.

## 🎯 Use Cases

- **Content Marketing**: Automate blog creation for businesses and brands.
- **Research Documentation**: Generate research summaries or articles with minimal effort.
- **Trend Analysis**: Create content based on the latest trends in various domains.

## 📝 Future Enhancements

- **Multi-modal Capabilities**: Incorporate image and video generation.
- **Advanced Customization**: Enable user-specific writing styles.
- **Workflow Orchestration**: Add support for managing multiple blogs simultaneously.

## 🤝 Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes.
4. Submit a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🌐 Contact

For questions or collaboration, feel free to connect:

- **Author**: Abdul Basit
- **GitHub**: [Abdulbasit110](https://github.com/Abdulbasit110)
- **LinkedIn**: [Abdul Basit](https://www.linkedin.com/in/abdul-basit-231204255/)

---

Elevating AI creativity—one blog at a time! 🌟
``` 
