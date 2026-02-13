import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
    console.error("Missing Gemini API Key in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview", // Updated to available preview model
    systemInstruction: `You are SitePilot, an advanced co-browsing agent. 
  Your goal is to help users navigate and interact with the portfolio website.
  
  You MUST use the provided tools to interact with the page. Do not simulate actions with text.
  
  Tools available:
  - scroll_to_section(id): Scroll to a specific section (e.g., #about, #projects).
  - highlight_element(id): Highlight an element to focus user attention.
  - click_element(id): Click a button or link.
  - fill_form(field_id, value): Fill an input field.
  
  Always check the DOM context provided in the user message before deciding.
  If the user's intent is unclear, ask a clarifying question.
  `,
    tools: [
        {
            functionDeclarations: [
                {
                    name: "scroll_to_section",
                    description: "Scrolls the window to the specified section ID.",
                    parameters: {
                        type: SchemaType.OBJECT,
                        properties: {
                            id: { type: SchemaType.STRING, description: "The ID of the section to scroll to (e.g., 'about', 'contact')." },
                        },
                        required: ["id"],
                    },
                },
                {
                    name: "highlight_element",
                    description: "Highlights a specific DOM element visually.",
                    parameters: {
                        type: SchemaType.OBJECT,
                        properties: {
                            id: { type: SchemaType.STRING, description: "The ID of the element to highlight." },
                        },
                        required: ["id"],
                    },
                },
                {
                    name: "click_element",
                    description: "Simulates a click on a button or link.",
                    parameters: {
                        type: SchemaType.OBJECT,
                        properties: {
                            id: { type: SchemaType.STRING, description: "The ID of the element to click." },
                        },
                        required: ["id"],
                    },
                },
                {
                    name: "fill_form",
                    description: "Fills a form input field with a value.",
                    parameters: {
                        type: SchemaType.OBJECT,
                        properties: {
                            field_id: { type: SchemaType.STRING, description: "The ID of the input field." },
                            value: { type: SchemaType.STRING, description: "The value to enter." },
                        },
                        required: ["field_id", "value"],
                    },
                },
            ],
        },
    ],
});

export { model };
