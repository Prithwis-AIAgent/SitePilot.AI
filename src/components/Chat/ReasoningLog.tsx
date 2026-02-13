import React, { useRef, useEffect } from 'react';
import { LogEntry } from '@/hooks/useAgent';
import { Terminal, Activity, FileJson } from 'lucide-react';

interface ReasoningLogProps {
    logs: LogEntry[];
    isOpen: boolean;
    onClose: () => void;
}

export const ReasoningLog: React.FC<ReasoningLogProps> = ({ logs, isOpen, onClose }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-slate-900 rounded-lg shadow-2xl border border-slate-700 flex flex-col overflow-hidden font-mono text-sm z-50">
            {/* Header */}
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Agent Reasoning Log</span>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
            </div>

            {/* Log Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {logs.length === 0 && (
                    <div className="text-slate-500 italic text-center mt-10">Waiting for activity...</div>
                )}

                {logs.map((log) => (
                    <div key={log.id} className="animate-fade-in">
                        <div className="flex items-center gap-2 mb-1">
                            {log.source === 'user' && <span className="text-blue-400 text-xs font-bold">USER</span>}
                            {log.source === 'agent' && <span className="text-purple-400 text-xs font-bold">AGENT</span>}
                            {log.source === 'system' && <span className="text-emerald-400 text-xs font-bold">SYSTEM</span>}
                            <span className="text-slate-600 text-[10px]">{log.timestamp.toLocaleTimeString()}</span>
                        </div>

                        <div className={`
                p-2 rounded 
                ${log.source === 'system' ? 'bg-slate-800/50 text-emerald-300' : 'text-slate-300'}
                break-words
             `}>
                            {log.content}
                            {log.metadata && (
                                <div className="mt-2 p-2 bg-slate-950 rounded border border-slate-800 text-xs overflow-x-auto">
                                    <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Footer Status */}
            <div className="px-4 py-1 bg-slate-800/50 border-t border-slate-800 text-[10px] text-slate-500 flex items-center gap-2">
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                System Active
            </div>
        </div>
    );
};
