import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Code2, Eye, EyeOff, ArrowRight, GitBranch, Globe } from 'lucide-react'

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen mesh-bg flex">
      {/* Left — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 grid-dots opacity-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-sm">
          <div className="glass-strong rounded-2xl p-6 mb-6 gradient-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">Alex Chen</div>
                <div className="text-xs text-slate-500">Senior Engineer @ Stripe</div>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "CodeCompass AI cut my onboarding time from 3 weeks to 3 days. I asked it questions I was too embarrassed to ask my teammates."
            </p>
            <div className="flex mt-3">
              {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-xs">★</span>)}
            </div>
          </div>

          <div className="glass rounded-xl p-4 border border-blue-500/10 font-mono text-xs">
            <div className="text-slate-500 mb-2">// Recent query</div>
            <div className="text-blue-300">ask("Where is user session managed?")</div>
            <div className="text-slate-600 mt-1">→ src/auth/session.ts:127</div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Code2 size={16} className="text-blue-400" />
            </div>
            <span className="font-bold text-white">CodeCompass <span className="gradient-text">AI</span></span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 mb-8">Sign in to continue to your workspace</p>

          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 glass border border-blue-500/15 rounded-xl py-2.5 text-sm text-slate-300 hover:text-white hover:border-blue-400/30 transition-all">
              <GitBranch size={16} />
              GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 glass border border-blue-500/15 rounded-xl py-2.5 text-sm text-slate-300 hover:text-white hover:border-blue-400/30 transition-all">
              <Globe size={16} />
              Google
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-blue-500/10" />
            <span className="text-xs text-slate-600">or continue with email</span>
            <div className="flex-1 h-px bg-blue-500/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@stripe.com"
                className="w-full glass border border-blue-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/25 transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-slate-400">Password</label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full glass border border-blue-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/25 transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl font-semibold transition-all glow-blue hover:shadow-lg hover:shadow-blue-500/25 mt-2"
            >
              Sign In
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-sm text-slate-500 text-center mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
