import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Brain, Search, GitBranch, FileText, MessageSquare, ArrowRight,
  CheckCircle, XCircle, Upload, Cpu, HelpCircle, Sparkles,
  Play, ChevronRight, Star, Zap, Shield, Clock
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Code Understanding',
    desc: 'Gemini-powered analysis that reads your codebase like a senior developer, understanding architecture, patterns, and intent.',
    color: 'blue',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    desc: 'Find any function, pattern, or concept using natural language. FAISS vector search returns the most relevant code in milliseconds.',
    color: 'violet',
  },
  {
    icon: GitBranch,
    title: 'Repository Analysis',
    desc: 'Full repository ingestion with automatic chunking, dependency graph construction, and intelligent context building.',
    color: 'emerald',
  },
  {
    icon: FileText,
    title: 'File Explanations',
    desc: 'Get plain-English explanations of any file — its purpose, key exports, side effects, and how it fits the larger system.',
    color: 'amber',
  },
  {
    icon: MessageSquare,
    title: 'Context-Aware Chat',
    desc: 'Ask follow-up questions that build on prior answers. The AI maintains conversation context while grounding every response in your code.',
    color: 'rose',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    desc: 'Your code never leaves your infrastructure. Self-hostable with end-to-end encryption and zero data retention.',
    color: 'cyan',
  },
]

const colorMap: Record<string, string> = {
  blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400',
  violet: 'from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400',
  emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
  amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400',
  rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/20 text-rose-400',
  cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 text-cyan-400',
}

const steps = [
  { icon: Upload, label: 'Upload Repository', desc: 'Drag & drop or connect via GitHub URL', num: '01' },
  { icon: Cpu, label: 'AI Indexing', desc: 'LangChain + FAISS builds your semantic index', num: '02' },
  { icon: HelpCircle, label: 'Ask Questions', desc: 'Chat in natural language about your code', num: '03' },
  { icon: Sparkles, label: 'Get Accurate Answers', desc: 'Grounded, cited responses with source refs', num: '04' },
]

const stack = [
  { name: 'React', icon: '⚛️', desc: 'Frontend UI' },
  { name: 'FastAPI', icon: '⚡', desc: 'Backend API' },
  { name: 'LangChain', icon: '🔗', desc: 'RAG Pipeline' },
  { name: 'FAISS', icon: '🔍', desc: 'Vector Search' },
  { name: 'Gemini', icon: '✨', desc: 'Language Model' },
  { name: 'Tailwind', icon: '🎨', desc: 'Styling' },
]

const traditional = [
  'Read docs hoping they\'re current',
  'Ctrl+F through hundreds of files',
  'Ask teammates, disrupt their flow',
  'Guess at function behavior',
  'Hours to understand one module',
]

const aiWay = [
  'Instant answers from live code',
  'Semantic search across entire repo',
  'Available 24/7, no context switches',
  'Traced to exact source lines',
  'Seconds to understand any module',
]

const codeLines = [
  { text: '// CodeCompass AI', color: 'text-slate-500' },
  { text: 'const repo = await indexRepository({', color: 'text-blue-300' },
  { text: '  url: "github.com/your/project",', color: 'text-emerald-300' },
  { text: '  model: "gemini-2.0-flash",', color: 'text-violet-300' },
  { text: '  vectorStore: "faiss"', color: 'text-amber-300' },
  { text: '})', color: 'text-blue-300' },
  { text: '', color: '' },
  { text: 'const answer = await repo.ask(', color: 'text-blue-300' },
  { text: '  "How does auth middleware work?"', color: 'text-emerald-300' },
  { text: ')', color: 'text-blue-300' },
]

export default function Landing() {
  const [typed, setTyped] = useState('')
  const headline = 'Understand Any Codebase in Seconds'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setTyped(headline.slice(0, i + 1))
      i++
      if (i >= headline.length) clearInterval(timer)
    }, 40)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen mesh-bg">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-blue-300 mb-8 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              Powered by Gemini 2.0 + RAG
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight min-h-[9rem] lg:min-h-[12rem]">
              {typed}
              {typed.length < headline.length && (
                <span className="animate-pulse text-blue-400">|</span>
              )}
            </h1>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
              CodeCompass AI indexes your entire repository and lets you ask questions in plain English.
              Get accurate, cited answers grounded in your actual code — not hallucinations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/25 glow-blue"
              >
                <Zap size={18} />
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/chat"
                className="flex items-center gap-2 glass border border-blue-500/20 text-blue-300 hover:text-white hover:border-blue-400/40 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Play size={16} />
                Live Demo
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-slate-500">
              {['No credit card', 'Free tier available', 'Deploy anywhere'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={13} className="text-emerald-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Code preview card */}
          <div className="relative animate-float">
            <div className="glass-strong rounded-2xl overflow-hidden gradient-border glow-blue">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 border-b border-blue-500/10">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs text-slate-500 ml-2 font-mono">codecompass.ts</span>
              </div>
              <div className="p-6 font-mono text-sm leading-7">
                {codeLines.map((line, i) => (
                  <div key={i} className={line.color || 'h-4'}>
                    {line.text && (
                      <>
                        <span className="text-slate-600 mr-4 select-none text-xs">{String(i + 1).padStart(2, ' ')}</span>
                        {line.text}
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="px-6 pb-4 pt-0 border-t border-blue-500/10">
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1.5 font-mono">// Response</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    The auth middleware in <span className="text-blue-400 font-mono">middleware/auth.go:42</span> validates
                    JWT tokens using HMAC-SHA256. It checks expiry, role claims, and sets the user context before
                    passing to the next handler.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-emerald-400 font-mono">✓ 3 sources cited</span>
                    <span className="text-xs text-slate-600">•</span>
                    <span className="text-xs text-slate-500 font-mono">89ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-blue-500/10 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: '10M+', label: 'Lines Indexed' },
            { val: '<200ms', label: 'Query Latency' },
            { val: '98%', label: 'Answer Accuracy' },
            { val: '50+', label: 'Languages' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{s.val}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-blue-300 mb-4 border border-blue-500/20">
            <Star size={12} />
            Features
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything you need to{' '}
            <span className="gradient-text">master any codebase</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From small scripts to million-line monorepos, CodeCompass AI gives you the same deep understanding a senior engineer develops over months.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const colors = colorMap[f.color]
            const [from, , , border, iconColor] = colors.split(' ')
            return (
              <div
                key={f.title}
                className={`glass rounded-2xl p-6 border hover:scale-[1.02] transition-transform cursor-default group gradient-border ${border}`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${from} border ${border} flex items-center justify-center mb-4`}>
                  <f.icon size={18} className={iconColor} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-900/20 border-y border-blue-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-blue-300 mb-4 border border-blue-500/20">
              <Clock size={12} />
              How It Works
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Up and running in <span className="gradient-text">under 2 minutes</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.label} className="relative text-center">
                  <div className="flex justify-center mb-5">
                    <div className="relative w-20 h-20 glass rounded-2xl border border-blue-500/20 flex items-center justify-center group hover:border-blue-400/40 transition-colors">
                      <step.icon size={28} className="text-blue-400" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                        {i + 1}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-blue-500/50 mb-1">{step.num}</div>
                  <h3 className="font-semibold text-white mb-2">{step.label}</h3>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="stack" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-4">
            Built on the <span className="gradient-text">best tools</span>
          </h2>
          <p className="text-slate-400">A modern, production-grade stack designed for reliability and speed.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stack.map((t) => (
            <div
              key={t.name}
              className="glass rounded-2xl p-5 border border-blue-500/10 text-center hover:border-blue-400/30 transition-all hover:scale-105 cursor-default"
            >
              <div className="text-3xl mb-3">{t.icon}</div>
              <div className="font-semibold text-white text-sm">{t.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-slate-900/20 border-y border-blue-500/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">
              The <span className="gradient-text">old way</span> vs the AI way
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-7 border border-red-500/20">
              <div className="flex items-center gap-2 mb-6">
                <XCircle size={18} className="text-red-400" />
                <h3 className="font-semibold text-slate-300">Traditional Exploration</h3>
              </div>
              <ul className="space-y-4">
                {traditional.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                    <XCircle size={14} className="text-red-500/60 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-7 border border-emerald-500/20 glow-blue">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle size={18} className="text-emerald-400" />
                <h3 className="font-semibold text-white">With CodeCompass AI</h3>
              </div>
              <ul className="space-y-4">
                {aiWay.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 max-w-4xl mx-auto px-6 text-center">
        <div className="glass rounded-3xl p-12 gradient-border border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to understand your codebase?
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Join thousands of developers who ship faster with CodeCompass AI.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-xl font-semibold transition-all glow-blue hover:shadow-lg hover:shadow-blue-500/25"
              >
                Start for Free
                <ChevronRight size={16} />
              </Link>
              <Link
                to="/chat"
                className="flex items-center gap-2 glass border border-blue-500/20 text-blue-300 hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all"
              >
                Explore the Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">CodeCompass</span>
            <span className="gradient-text font-bold">AI</span>
          </div>
          <p className="text-sm text-slate-600">© 2025 CodeCompass AI. Built for developers.</p>
          <div className="flex gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
