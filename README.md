# SitePilot AI - Agentic Co-Browsing Assistant

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Gemini](https://img.shields.io/badge/AI-Gemini_2.5_Flash-orange)
![Tailwind](https://img.shields.io/badge/CSS-Tailwind-cyan)

**SitePilot AI** is a conversational agent embedded within a portfolio website. It acts as a **smart co-browsing assistant**, capable of "seeing" the page structure (DOM), reasoning about user intent using **Google's Gemini 2.5 Flash**, and executing actions like scrolling, highlighting elements, and navigating the site for you.

## 🚀 Features

-   **Agentic Co-Browsing**: The agent "sees" the page via a dynamic DOM mapper and can navigate for you.
-   **Smart Highlighting**: Intelligently identifies projects and sections (e.g., "Highlight the medical project in blue") and applies dynamic styling.
-   **Natural Language Control**: Ask "Show me the projects", "Click the send message button", or "Contact Prithwis" and the agent executes the action.
-   **Reasoning Terminal**: Visualizes the agent's thought process (Sense-Think-Act loop) in real-time.
-   **Custom UI**: 
    -   Minimized "Pixel Cat" floating button.
    -   Expanded chat interface with real-time feedback.
    -   Dark/Light mode optimized components.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **AI Model**: Google Gemini 2.5 Flash (via `google-generative-ai` SDK)
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React & Custom SVG Pixel Art
-   **Animations**: Framer Motion

## 🏗️ Architecture

The system follows a **Sense-Think-Act** loop:

1.  **Sense (`dom-mapper.ts`)**: 
    -   The agent scans the current page, converting visible semantic elements (headings, links, inputs) into a simplified Markdown representation.
    -   It identifies "Containers" (e.g., `#project-medical`) to understand the layout of complex components like project cards.

2.  **Think (`gemini.ts`)**: 
    -   This markdown vision, along with the user's query, is sent to **Gemini 2.5 Flash**.
    -   The model reasons about the best course of action and decides which tool to call (`scroll_to_section`, `highlight_element`, `click_element`, etc.).

3.  **Act (`agent-tools.ts`)**: 
    -   The system executes the chosen tool on the frontend, updating the UI state (scrolling, highlighting, clicking) to fulfill the user's request.

## 🏁 Getting Started

### Prerequisites

-   **Node.js 18+** installed on your machine.
-   A **Google AI Studio API Key**.

### 🔑 Gemini API Configuration

1.  Go to [Google AI Studio](https://aistudio.google.com/).
2.  Click **"Get API key"** and create a new key.
3.  Ensure your key has access to `gemini-2.5-flash` or `gemini-1.5-flash` models.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Prithwis-AIAgent/SitePilot.AI.git
    cd SitePilot.AI
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env.local` file in the root directory and add your API Key:
    ```bash
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to interact with the agent.

## 📦 Deployment (Vercel)

1.  Push your code to GitHub.
2.  Import the project into [Vercel](https://vercel.com/).
3.  Add your `NEXT_PUBLIC_GEMINI_API_KEY` in the Vercel Project Settings > Environment Variables.
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Developed by [Prithwis Das](https://github.com/Prithwis-AIAgent).
