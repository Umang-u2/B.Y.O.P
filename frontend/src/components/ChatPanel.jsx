import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

import axios from 'axios';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function ChatPanel() {
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello! Upload a PDF to get started, and I\'ll help you explore its contents through conversation.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/chat', { message: userMsg.content });
            const aiMsg = { role: 'ai', content: response.data };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error connecting to the brain.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div className="max-w-3xl mx-auto space-y-6 pt-10">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user'
                                ? 'bg-violet-600 shadow-lg shadow-violet-500/20'
                                : 'bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/20'
                                }`}>
                                {msg.role === 'user' ? (
                                    <User className="w-5 h-5 text-white" />
                                ) : (
                                    <Bot className="w-5 h-5 text-white" />
                                )}
                            </div>

                            {/* Message Bubble */}
                            <div className={`relative max-w-[80%] rounded-2xl p-6 ${msg.role === 'user'
                                ? 'bg-slate-800 text-slate-100 rounded-tr-sm border border-slate-700'
                                : 'bg-slate-900/50 backdrop-blur-sm text-slate-200 rounded-tl-sm border border-white/5'
                                }`}>
                                <Markdown
                                    options={{
                                        overrides: {
                                            ul: { props: { className: "list-disc pl-4 mb-2 space-y-1" } },
                                            ol: { props: { className: "list-decimal pl-4 mb-2 space-y-1" } },
                                            li: { props: { className: "mb-0.5" } },
                                            p: { props: { className: "mb-2 last:mb-0" } },
                                            strong: { props: { className: "text-violet-200 font-bold" } },
                                        }
                                    }}
                                    className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0"
                                >
                                    {msg.content}
                                </Markdown>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl rounded-tl-sm p-6 border border-white/5 flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-6 relative z-20">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={sendMessage} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative bg-slate-900 border border-slate-700 rounded-2xl flex items-center p-2 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/50 transition-all duration-300 shadow-2xl">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question about your PDF..."
                                className="flex-1 bg-transparent px-4 py-3 text-white placeholder-slate-500 focus:outline-none font-outfit"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="p-3 bg-violet-600 text-white rounded-xl hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-violet-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/20"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-xs text-slate-600 mt-4 font-outfit">
                        AI can make mistakes. Verify important information from documents.
                    </p>
                </div>
            </div>
        </div>
    );
}
