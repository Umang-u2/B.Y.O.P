import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Zap, Shield, ArrowRight, Sparkles } from 'lucide-react';

function LandingPage() {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const features = [
        {
            icon: MessageSquare,
            title: 'Chat with your PDFs',
            description: 'Transform static documents into interactive conversations. Ask questions and get instant answers from your PDFs.',
            gradient: 'from-violet-500 to-purple-600'
        },
        {
            icon: Zap,
            title: 'Instant Insights',
            description: 'Extract key information in seconds. No more endless scrolling through pages to find what you need.',
            gradient: 'from-cyan-500 to-teal-600'
        },
        {
            icon: Shield,
            title: 'Your Documents, Your Conversations',
            description: 'Complete privacy and security. Your documents stay yours, and conversations are never shared.',
            gradient: 'from-orange-500 to-pink-600'
        }
    ];

    return (
        <>
            <Helmet>
                <title>B.Y.O.P - Bring Your Own PDF</title>
                <meta name="description" content="Chat with your PDFs using AI. Get instant insights, ask questions, and unlock the knowledge hidden in your documents." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>

            <div className="min-h-screen bg-slate-950 overflow-hidden relative font-sans">
                {/* Animated Background Gradient */}
                <div className="fixed inset-0 bg-gradient-to-br from-violet-950 via-slate-950 to-teal-950 animate-gradient-shift" />

                {/* Background Images with Parallax */}
                <motion.div
                    style={{ y }}
                    className="fixed inset-0 opacity-10"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609943307889-6556d0cc598a')] bg-cover bg-center mix-blend-overlay" />
                </motion.div>

                {/* Floating Geometric Shapes */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-3xl blur-xl"
                    />
                    <motion.div
                        animate={{
                            y: [0, 40, 0],
                            rotate: [0, -90, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-40 right-[15%] w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-teal-600/20 rounded-full blur-xl"
                    />
                    <motion.div
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 30, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-32 left-[20%] w-48 h-48 bg-gradient-to-br from-orange-500/20 to-pink-600/20 rounded-2xl blur-xl rotate-45"
                    />
                </div>

                {/* Hero Section */}
                <motion.section
                    style={{ opacity }}
                    className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center"
                >
                    {/* Main Hero Visual Background Element */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/30 via-teal-500/20 to-orange-500/30 rounded-full blur-[100px] animate-pulse-glow opacity-50" />
                    </div>

                    <div className="max-w-6xl mx-auto z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Glowing Background behind text */}
                            <motion.div
                                animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-cyan-400/20 to-orange-400/20 blur-3xl rounded-full"
                            />

                            <h1
                                className="relative text-7xl md:text-9xl font-bold tracking-tighter mb-4 py-4"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                <span className="bg-gradient-to-r from-purple-400 via-teal-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl filter">
                                    B.Y.O.P
                                </span>
                            </h1>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-3xl md:text-5xl font-bold text-white mb-8"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Bring Your Own PDF
                            </motion.h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Transform static PDFs into interactive conversations. Ask questions, get instant insights, and unlock the knowledge hidden in your documents.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <button
                                onClick={() => navigate('/app')}
                                className="group relative px-10 py-8 text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl shadow-2xl shadow-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/70 overflow-hidden cursor-pointer"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Start Chatting <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-white/20 to-cyan-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                            </button>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-6 h-10 border-2 border-violet-400/50 rounded-full flex items-start justify-center p-2"
                            >
                                <motion.div
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-1.5 h-1.5 bg-violet-400 rounded-full"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Features Section */}
                <section className="relative py-32 px-4 bg-slate-950/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <h2
                                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Why Choose B.Y.O.P?
                            </h2>
                            <p
                                className="text-xl text-slate-400 max-w-2xl mx-auto"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Experience the future of document interaction
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-3xl"
                                        style={{
                                            background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                                            '--tw-gradient-from': feature.gradient.split(' ')[0].replace('from-', ''),
                                            '--tw-gradient-to': feature.gradient.split(' ')[1].replace('to-', '')
                                        }}
                                    />
                                    <div className="relative h-full p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-slate-700/50 transition-all duration-300">
                                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3
                                            className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            {feature.title}
                                        </h3>
                                        <p
                                            className="text-slate-400 leading-relaxed"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}
                                        >
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>



                {/* Footer */}
                <footer className="relative py-12 px-4 border-t border-slate-800/50">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-slate-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            © 2026 B.Y.O.P. Powered by Google Gemini Pro • Designed by Umang
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default LandingPage;
