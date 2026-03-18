# 🚀 Resume Reviewer & AI Interview Coach

A powerful, AI-driven platform designed to help job seekers bridge the gap between their resume and their dream job. By leveraging advanced Large Language Models (LLMs) like **Google Gemini** and **OpenAI**, this tool provides deep analytical insights, personalized interview preparation, and a structured roadmap for career success.

---

## ✨ Key Features

- **📄 Intelligent Resume Analysis**: Analyzes PDF resumes in a context-aware manner.
- **🎯 Match Score & Skill Gaps**: Calculates how well your profile aligns with a specific Job Description (JD) and identifies critical skills you might be missing.
- **🤖 Role-Specific Interview Coaching**:
  - **Technical Questions**: Tailored technical deep-dives with detailed "Intention" and "How to Answer" guides.
  - **Behavioral Questions**: Scenario-based questions to help you master the "soft skills" and cultural fit aspects of the interview.
- **📅 Structured Preparation Plan**: Generates a dynamic, multi-day roadmap with daily focus areas and actionable tasks.
- **🗃️ Report History**: Keep track of all your generated reports and preparation progress in one place.
- **🎨 Premium UI/UX**: A modern, interactive interface built with React, featuring smooth animations and data visualizations.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://reactjs.org/) (Vite)
- **Styling**: [SASS](https://sass-lang.com/) (SCSS)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/) & [OpenAI API](https://openai.com/api/)
- **File Handling**: [Multer](https://github.com/expressjs/multer) & [PDF-Parse](https://github.com/nisaacson/pdf-parse)
- **Security**: [JWT](https://jwt.io/), [BcryptJS](https://github.com/thlorenz/bcryptjs), and [Cookie-Parser](https://github.com/expressjs/cookie-parser)

---

## 🚀 Usage

1.  **Register/Login**: Create an account to securely store and access your interview reports.
2.  **Generate Report**:
    -   Paste the **Job Description** (the more detail, the better!).
    -   Upload your **Resume** in PDF format.
    -   (Optional) Add a **Self Description** to highlight specific goals or background details.
3.  **Analyze & Prep**:
    -   View your **Match Score** and identify **Skill Gaps**.
    -   Study the **Technical and Behavioral Questions** tailored to the role.
    -   Follow the generated **Preparation Plan** daily to walk into your interview with confidence.

---

## 🏗️ Architecture

1.  **UI Layer**: Reusable components and pages (React).
2.  **Hook Layer**: Custom hooks for managing state and connecting to the API layer.
3.  **State Layer**: Context providers (`auth.context`, `interview.context`) for global data management.
4.  **API Layer**: Modular service calls for communication with the backend.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- API Keys for Google Gemini or OpenAI

### 2. Backend Setup
1.  Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add the following:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GOOGLE_API_KEY=your_gemini_api_key
    OPENAI_API_KEY=your_openai_api_key
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup
1.  Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

---

## 📸 Project Structure

```text
├── Backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # AI & logic layer
│   │   └── middlewares/    # Auth & file upload
├── Frontend/
│   ├── src/
│   │   ├── features/       # Feature-based modules (Auth, Interview)
│   │   ├── styles/         # Global styles
│   │   └── hooks/          # Shared custom hooks
└── README.md
```

---
Developed with ❤️ by Asrar Ahammad
