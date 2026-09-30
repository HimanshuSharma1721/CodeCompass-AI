import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Code2, Eye, EyeOff, ArrowRight, GitBranch, CheckCircle } from 'lucide-react'

const perks = [
  'Index up to 5 repositories free',
  'Unlimited questions per day',
  'Context-aware multi-turn chat',
  'Private & secure — your code stays yours',
]

export default function Register() {
  const [showPw, setShowPw] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen mesh-bg flex">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Code2 size={16} className="text-blue-400" />
            </div>
            <span className="font-bold text-white">CodeCompass <span className="gradient-text">AI</span></span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-400 mb-8">Start understanding codebases in seconds</p>

          <button className="w-full flex items-center justify-center gap-2 glass border border-blue-500/15 rounded-xl py-2.5 text-sm text-slate-300 hover:text-white hover:border-blue-400/30 transition-all mb-6">
            <GitBranch size={16} />
            Continue with GitHub
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-blue-500/10" />
            <span className="text-xs text-slate-600">or with email</span>
            <div className="flex-1 h-px bg-blue-500/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alex Chen"
                className="w-full glass border border-blue-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/25 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Work email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full glass border border-blue-500/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/25 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
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
              {password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= i * 3
                          ? i <= 1 ? 'bg-red-500' : i <= 2 ? 'bg-amber-500' : 'bg-emerald-500'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl font-semibold transition-all glow-blue hover:shadow-lg hover:shadow-blue-500/25 mt-2"
            >
              Create Free Account
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-xs text-slate-600 text-center mt-4">
            By creating an account you agree to our{' '}
            <a href="#" className="text-slate-500 hover:text-slate-400">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-slate-500 hover:text-slate-400">Privacy Policy</a>
          </p>

          <p className="text-sm text-slate-500 text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right — perks */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden items-center justify-center p-12 border-l border-blue-500/10">
        <div className="absolute inset-0 grid-dots opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-xs">
          <h3 className="text-xl font-bold text-white mb-6">Everything included, free</h3>
          <ul className="space-y-4">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-300">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 glass rounded-2xl p-5 border border-blue-500/15">
            <div className="text-xs text-slate-500 font-mono mb-3">// Trusted by engineers at</div>
            <div className="grid grid-cols-3 gap-3">
              {['Stripe', 'Vercel', 'Linear', 'Figma', 'Notion', 'Supabase'].map(c => (
                <div key={c} className="text-center py-2 px-3 bg-slate-800/40 rounded-lg text-xs text-slate-400 font-mono">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
