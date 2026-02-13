import { model } from './gemini';
import { extractDOM } from './dom-mapper';
import { ChatSession, Content, Part } from '@google/generative-ai';

export interface AgentAction {
    type: 'tool_call' | 'response';
    toolName?: string;
    toolArgs?: any;
    content?: string;
}

export interface AgentState {
    history: Content[];
    isProcessing: boolean;
}

/**
 * The Antigravity Engine
 * Manages the conversation and tool execution loop.
 */
export class Antigravity {
    private chat: ChatSession;

    constructor() {
        this.chat = model.startChat({
            history: [],
        });
    }

    /**
     * Processes a user message with the current DOM context.
     */
    async processMessage(userMessage: string, domContext: string): Promise<AgentAction[]> {
        const fullPrompt = `Context (DOM Structure):\n${domContext}\n\nUser Request: ${userMessage}`;

        try {
            const result = await this.chat.sendMessage(fullPrompt);
            const response = result.response;
            const actions: AgentAction[] = [];

            // Handle function calls
            const functionCalls = response.functionCalls();
            if (functionCalls && functionCalls.length > 0) {
                for (const call of functionCalls) {
                    actions.push({
                        type: 'tool_call',
                        toolName: call.name,
                        toolArgs: call.args,
                        content: `Invoking tool: ${call.name} with args: ${JSON.stringify(call.args)}`
                    });
                }
            }

            // Handle text response
            if (response.text()) {
                actions.push({
                    type: 'response',
                    content: response.text()
                });
            }

            return actions;
        } catch (error) {
            console.error("Antigravity Error:", error);
            return [{
                type: 'response',
                content: "I encountered an error processing your request."
            }];
        }
    }

    /**
     * Feeds tool execution results back to the model (for multi-turn sequences).
     * Note: For this simplified demo, we might just assume success or single-turn for now,
     * but a real agent would loop back here.
     */
    // TODO: Implement result feedback loop
}
