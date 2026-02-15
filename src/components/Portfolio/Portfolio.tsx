import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Globe } from 'lucide-react';

export const Portfolio = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Prithwis Das
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#about" id="nav-about" className="hover:text-blue-600 transition-colors">About</a>
                        <a href="#projects" id="nav-projects" className="hover:text-blue-600 transition-colors">Projects</a>
                        <a href="#contact" id="nav-contact" className="hover:text-blue-600 transition-colors">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="py-20 md:py-32 container mx-auto px-6 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                    AI Engineer & <br className="hidden md:block" />
                    <span className="text-blue-600">Software Agentic Systems Developer</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-10">
                    I build production-ready AI agent systems that solve real business problems.
                </p>
                <div className="flex gap-4">
                    <button
                        id="cta-projects"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
                    >
                        View Projects
                    </button>
                    <a
                        href="https://github.com/Prithwis-AIAgent"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="link-github-hero"
                        className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center gap-2"
                    >
                        <Github className="w-5 h-5" /> GitHub
                    </a>
                </div>
            </header>

            {/* About Section */}
            <section id="about" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        About Me
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-lg text-slate-600">
                            <p>
                                Hi! I'm Prithwis. I specialize in building autonomous agents and complex AI systems.
                                My work focuses on leveraging Large Language Models (LLMs) to create intelligent workflows that automate decision-making and data analysis.
                            </p>
                            <p>
                                From medical diagnostics to prediction markets, I design systems where multiple AI agents collaborate to achieve superior results.
                            </p>
                        </div>
                        <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
                            <h3 className="font-semibold mb-4 text-slate-900">Core Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Python', 'LangGraph', 'CrewAI', 'OpenAI', 'Gemini', 'Next.js', 'React', 'TypeScript', 'LiteLLM', 'Gradio'].map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        Featured Projects
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {/* Project 1 */}
                        <div id="project-medical" className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow group flex flex-col">
                            <div className="h-48 bg-gradient-to-br from-red-500 to-pink-600 group-hover:scale-105 transition-transform duration-500"></div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2">AI Agents for Medical Diagnostics</h3>
                                <p className="text-slate-600 mb-4 flex-1">
                                    A multi-agent system using three specialized agents (Cardiologist, Psychologist, Pulmonologist) to analyze patient medical reports concurrently and provide domain-specific insights.
                                </p>
                                <div className="flex gap-3 mt-auto">
                                    <a href="https://github.com/Prithwis-AIAgent/AI-Agents-for-Medical-Diagnostics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-md">
                                        <Github className="w-4 h-4 mr-2" /> Code
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div id="project-nero" className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow group flex flex-col">
                            <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:scale-105 transition-transform duration-500"></div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2">Personal SideKick Nero</h3>
                                <p className="text-slate-600 mb-4 flex-1">
                                    AI-powered personal co-worker built with LangGraph & Gradio. Features web browsing, file management, Wikipedia integration, and push notifications. Powered by GPT-4o-mini equivalents.
                                </p>
                                <div className="flex gap-3 mt-auto">
                                    <a href="https://github.com/Prithwis-AIAgent/Personal_SideKick_Nero" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-md">
                                        <Github className="w-4 h-4 mr-2" /> Code
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div id="project-prediction" className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow group flex flex-col">
                            <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-600 group-hover:scale-105 transition-transform duration-500"></div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2">Prediction Market Aggregation</h3>
                                <p className="text-slate-600 mb-4 flex-1">
                                    🤖 Multi-Agent AI System for Unifying Gambling Markets built with CrewAI and LiteLLM. Scrapes and unifies prediction markets from Polymarket, Kalshi, and others for comparative analysis.
                                </p>
                                <div className="flex gap-3 mt-auto">
                                    <a href="https://github.com/Prithwis-AIAgent/Prediction-Market-AggregationAgent-system" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-md">
                                        <Github className="w-4 h-4 mr-2" /> Code
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Project 4 */}
                        <div id="project-resume" className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow group flex flex-col">
                            <div className="h-48 bg-gradient-to-br from-orange-500 to-amber-600 group-hover:scale-105 transition-transform duration-500"></div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2">ResumeReach AI</h3>
                                <p className="text-slate-600 mb-4 flex-1">
                                    AI-powered automation generating personalized cover letters, email bodies, and follow-up sequences using OpenAI GPT-3.5 Turbo. Reduces application time and cost by 80%.
                                </p>
                                <div className="flex gap-3 mt-auto">
                                    <a href="https://github.com/Prithwis-AIAgent/ResumeReach_AI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-md">
                                        <Github className="w-4 h-4 mr-2" /> Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        Get In Touch
                    </h2>
                    <div className="bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-200">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Connect with me</h3>
                                <p className="text-slate-600 mb-6">
                                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                                </p>
                                <div className="space-y-4">
                                    <a href="https://github.com/Prithwis-AIAgent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors">
                                        <Github className="w-6 h-6" />
                                        <span className="font-medium">/Prithwis-AIAgent</span>
                                    </a>
                                    <a href="https://www.linkedin.com/in/prithwis-das-8b4a79326" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors">
                                        <Linkedin className="w-6 h-6" />
                                        <span className="font-medium">/in/prithwis-das</span>
                                    </a>
                                    <a href="https://prithwisai-dev.onrender.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors">
                                        <Globe className="w-6 h-6" />
                                        <span className="font-medium">prithwisai-dev.onrender.com</span>
                                    </a>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="you@company.com"
                                    />
                                </div>

                                <button
                                    type="button"
                                    id="btn-send-message"
                                    onClick={() => alert("This is a demo form co-browsable by the agent.")}
                                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 bg-slate-900 text-slate-400 text-center">
                <p>&copy; {new Date().getFullYear()} Prithwis Das. All rights reserved.</p>
                <p className="text-xs mt-2 text-slate-600">Built with SitePilot AI Agent • Next.js • Gemini</p>
            </footer>
        </div>
    );
};
