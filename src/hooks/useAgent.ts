import { useState, useCallback, useRef } from 'react';
import { Antigravity, AgentAction } from '../lib/antigravity';
import { extractDOM } from '../lib/dom-mapper';

export interface LogEntry {
    id: string;
    source: 'user' | 'agent' | 'system';
    content: string;
    timestamp: Date;
    metadata?: any;
}

export const useAgent = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const agentRef = useRef<Antigravity | null>(null);

    // Initialize agent if not already done (lazy init)
    const getAgent = () => {
        if (!agentRef.current) {
            agentRef.current = new Antigravity();
        }
        return agentRef.current;
    };

    const addLog = (source: LogEntry['source'], content: string, metadata?: any) => {
        setLogs(prev => [...prev, {
            id: Math.random().toString(36).substring(7),
            source,
            content,
            timestamp: new Date(),
            metadata
        }]);
    };

    const executeTool = async (action: AgentAction) => {
        if (action.type !== 'tool_call' || !action.toolName) return;

        const { toolName, toolArgs } = action;
        // Log tool execution attempt
        addLog('system', `Executing tool: ${toolName}`, toolArgs);

        try {
            switch (toolName) {
                case 'scroll_to_section':
                    const section = document.getElementById(toolArgs.id.replace('#', ''));
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                        addLog('system', `Scrolled to section: ${toolArgs.id}`);
                    } else {
                        addLog('system', `Error: Section ${toolArgs.id} not found.`);
                    }
                    break;
                case 'highlight_element':
                    const el = document.getElementById(toolArgs.id.replace('#', ''));
                    if (el) {
                        const originalBorder = el.style.border;
                        const originalBoxShadow = el.style.boxShadow;

                        el.style.border = '2px solid #3b82f6'; // Tailwind blue-500
                        el.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        // Remove highlight after 2 seconds
                        setTimeout(() => {
                            el.style.border = originalBorder;
                            el.style.boxShadow = originalBoxShadow;
                        }, 2000);
                        addLog('system', `Highlighted element: ${toolArgs.id}`);
                    } else {
                        addLog('system', `Error: Element ${toolArgs.id} not found.`);
                    }
                    break;
                case 'click_element':
                    const clickable = document.getElementById(toolArgs.id.replace('#', ''));
                    if (clickable) {
                        clickable.click();
                        addLog('system', `Clicked element: ${toolArgs.id}`);
                    } else {
                        addLog('system', `Error: Element ${toolArgs.id} not found.`);
                    }
                    break;
                case 'fill_form':
                    const input = document.getElementById(toolArgs.field_id.replace('#', '')) as HTMLInputElement;
                    if (input) {
                        input.value = toolArgs.value;
                        // Trigger change event for React controlled inputs if needed
                        const event = new Event('input', { bubbles: true });
                        input.dispatchEvent(event);
                        addLog('system', `Filled form field: ${toolArgs.field_id}`);
                    } else {
                        addLog('system', `Error: Field ${toolArgs.field_id} not found.`);
                    }
                    break;
                default:
                    addLog('system', `Unknown tool: ${toolName}`);
            }
        } catch (err) {
            addLog('system', `Error executing tool ${toolName}: ${err}`);
        }
    };

    const processQuery = async (query: string) => {
        if (!query.trim()) return;

        setIsProcessing(true);
        addLog('user', query);

        try {
            const domMap = extractDOM();
            // Log the perceived DOM for debugging transparency
            // addLog('system', 'DOM Analysis Complete', { preview: domMap.substring(0, 100) + '...' });

            const agent = getAgent();
            const actions = await agent.processMessage(query, domMap);

            for (const action of actions) {
                if (action.type === 'response') {
                    addLog('agent', action.content || '');
                } else if (action.type === 'tool_call') {
                    await executeTool(action);
                }
            }

        } catch (error) {
            addLog('system', `Error processing query: ${error}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        logs,
        isProcessing,
        processQuery
    };
};
