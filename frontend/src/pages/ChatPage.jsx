import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot } from 'lucide-react';
import UploadPanel from '../components/UploadPanel';
import ChatPanel from '../components/ChatPanel';

export default function ChatPage() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-screen bg-slate-950 overflow-hidden font-sans text-slate-200">
            {/* Left Panel: Sidebar */}
            <div className="w-[400px] flex-shrink-0 border-r border-slate-800 bg-slate-950/50 p-6 flex flex-col z-20">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>

                <h2 className="text-xl font-bold text-white mb-6 font-space-grotesk tracking-wide">
                    Your Document
                </h2>

                <div className="flex-1 min-h-0">
                    <UploadPanel />
                </div>
            </div>

            {/* Right Panel: Chat Interface */}
            <div className="flex-1 flex flex-col relative">
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-b from-slate-900/0 via-violet-900/5 to-slate-900/0 rounded-full blur-3xl opacity-30" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-cyan-900/5 via-slate-900/0 to-slate-900/0 rounded-full blur-3xl opacity-20" />
                </div>

                {/* Top Bar */}
                <header className="h-16 flex items-center justify-end px-8 border-b border-white/5 z-10 glass">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-space-grotesk">
                            B.Y.O.P
                        </span>
                    </div>
                </header>

                {/* Main Chat Area */}
                <div className="flex-1 relative z-10 overflow-hidden">
                    <ChatPanel />
                </div>
            </div>
        </div>
    );
}
