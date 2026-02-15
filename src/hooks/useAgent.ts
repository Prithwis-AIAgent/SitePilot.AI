import { useState, useCallback, useRef } from 'react';
import { Antigravity, AgentAction } from '../lib/antigravity';
import { extractDOM } from '../lib/dom-mapper';
import * as Tools from '../lib/agent-tools';

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
                    if (Tools.scrollToSection(toolArgs.id)) {
                        addLog('system', `Scrolled to section: ${toolArgs.id}`);
                    } else {
                        addLog('system', `Error: Section ${toolArgs.id} not found.`);
                    }
                    break;
                case 'highlight_element':
                    if (Tools.highlightElement(toolArgs.id, toolArgs.color)) {
                        addLog('system', `Highlighted element: ${toolArgs.id} in ${toolArgs.color || 'default color'}`);
                    } else {
                        addLog('system', `Error: Element ${toolArgs.id} not found.`);
                    }
                    break;
                case 'click_element':
                    if (Tools.clickElement(toolArgs.id)) {
                        addLog('system', `Clicked element: ${toolArgs.id}`);
                    } else {
                        addLog('system', `Error: Element ${toolArgs.id} not found.`);
                    }
                    break;
                case 'fill_form':
                    if (Tools.fillForm(toolArgs.field_id, toolArgs.value)) {
                        addLog('system', `Filled form field: ${toolArgs.field_id}`);
                    } else {
                        addLog('system', `Error: Field ${toolArgs.field_id} not found.`);
                    }
                    break;
                case 'scroll_window':
                    if (Tools.scrollWindow(toolArgs.direction)) {
                        addLog('system', `Scrolled window: ${toolArgs.direction}`);
                    } else {
                        addLog('system', `Error: Invalid scroll direction ${toolArgs.direction}`);
                    }
                    break;
                case 'navigate_to_page':
                    if (Tools.navigateToPage(toolArgs.path)) {
                        addLog('system', `Navigating to: ${toolArgs.path}`);
                    } else {
                        addLog('system', `Error: Invalid path ${toolArgs.path}`);
                    }
                    break;
                case 'zoom_element':
                    if (Tools.zoomElement(toolArgs.id)) {
                        addLog('system', `Zoomed in on element: ${toolArgs.id}`);
                    } else {
                        addLog('system', `Error: Element ${toolArgs.id} not found.`);
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
