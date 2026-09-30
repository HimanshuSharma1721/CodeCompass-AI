import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Code2, Menu, X, Zap } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isApp = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/chat')

  if (isApp) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
            <Code2 size={16} className="text-blue-400" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-400 animate-pulse-glow" />
          </div>
          <span className="font-bold text-white tracking-tight">
            CodeCompass <span className="gradient-text">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Stack'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1.5 text-sm bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <Zap size={14} />
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-slate-400" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-blue-500/10 px-6 py-4 flex flex-col gap-4">
          {['Features', 'How It Works', 'Stack'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-slate-300 text-sm"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-blue-500/10">
            <Link to="/login" className="text-sm text-slate-300 py-2">Sign in</Link>
            <Link to="/register" className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg text-center font-medium">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
