import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Terminal, Loader2, Minus, X, MessageSquare } from 'lucide-react';
import { useAgent } from '@/hooks/useAgent';
import { ReasoningLog } from './ReasoningLog';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelCatMinimized, PixelCatTalking } from '../UI/PixelIcons';

export const ChatInterface = () => {
    const { logs, isProcessing, processQuery } = useAgent();
    const [input, setInput] = useState('');
    const [isLogOpen, setIsLogOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Minimized by default
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Filter logs to show only chat messages in the main view
    const chatMessages = logs.filter(log => log.source === 'user' || log.source === 'agent');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [chatMessages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const query = input;
        setInput('');
        await processQuery(query);
    };

    return (
        <>
            {/* Reasoning Log Overlay */}
            <ReasoningLog
                logs={logs}
                isOpen={isLogOpen}
                onClose={() => setIsLogOpen(false)}
            />

            {/* Floating Chat Widget Container */}
            <div className="fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end gap-4">

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-96 max-h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <PixelCatTalking className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">SitePilot AI</h3>
                                        <p className="text-xs text-blue-100 flex items-center gap-1">
                                            {isProcessing ? (
                                                <>
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    Thinking...
                                                </>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                                    Online
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setIsLogOpen(!isLogOpen)}
                                        className={`p-2 rounded-lg transition-colors ${isLogOpen ? 'bg-white text-blue-600' : 'hover:bg-white/10 text-white'}`}
                                        title="Toggle Reasoning Log"
                                    >
                                        <Terminal size={18} />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                                        title="Minimize"
                                    >
                                        <Minus size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px] max-h-[400px] custom-scrollbar">
                                {chatMessages.length === 0 && (
                                    <div className="text-center text-slate-400 mt-10 text-sm">
                                        <p>Hello! I'm SitePilot.</p>
                                        <p>I can help you navigate this portfolio.</p>
                                        <p className="mt-2 text-xs">Try asking:</p>
                                        <div className="mt-2 space-y-2">
                                            <button onClick={() => processQuery("Go to the projects section")} className="block w-full text-xs p-2 bg-white border border-slate-200 rounded hover:bg-blue-50 text-blue-600 transition-colors">
                                                "Go to projects"
                                            </button>
                                            <button onClick={() => processQuery("Highlight the contact form")} className="block w-full text-xs p-2 bg-white border border-slate-200 rounded hover:bg-blue-50 text-blue-600 transition-colors">
                                                "Highlight contact form"
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <AnimatePresence initial={false}>
                                    {chatMessages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-3 ${msg.source === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden bg-white
                        ${msg.source === 'user' ? 'bg-slate-200 text-slate-600' : 'p-1'}
                      `}>
                                                {msg.source === 'user' ? <User size={14} /> : <PixelCatTalking className="w-full h-full" />}
                                            </div>
                                            <div className={`
                        p-3 rounded-2xl text-sm max-w-[80%]
                        ${msg.source === 'user'
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}
                      `}>
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {isProcessing && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-full border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
                                            <PixelCatTalking className="w-full h-full" />
                                        </div>
                                        <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type a command..."
                                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                        disabled={isProcessing}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isProcessing}
                                        className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Minimized Toggle Button */}
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setIsOpen(true)}
                        className="w-16 h-16 bg-black rounded-full shadow-2xl flex items-center justify-center border-4 border-white overflow-hidden hover:rotate-12 transition-transform"
                    >
                        <PixelCatMinimized className="w-10 h-10 text-white" />
                    </motion.button>
                )}
            </div>
        </>
    );
};
