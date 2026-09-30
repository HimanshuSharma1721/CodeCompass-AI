import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Code2, Upload, Search, Bell, ChevronDown, MoreHorizontal,
  MessageSquare, GitBranch, Clock, Zap, TrendingUp, Plus, Star,
  Settings, LogOut, FolderOpen, Activity
} from 'lucide-react'

const repos = [
  {
    name: 'stripe/stripe-js',
    lang: 'TypeScript',
    langColor: 'bg-blue-400',
    files: 847,
    size: '24.3 MB',
    queries: 142,
    lastChat: '2 hours ago',
    status: 'indexed',
    stars: 4,
  },
  {
    name: 'vercel/next.js',
    lang: 'JavaScript',
    langColor: 'bg-amber-400',
    files: 3240,
    size: '187 MB',
    queries: 89,
    lastChat: 'Yesterday',
    status: 'indexed',
    stars: 5,
  },
  {
    name: 'supabase/supabase',
    lang: 'TypeScript',
    langColor: 'bg-blue-400',
    files: 1203,
    size: '56 MB',
    queries: 34,
    lastChat: '3 days ago',
    status: 'indexed',
    stars: 4,
  },
  {
    name: 'linear/linear-api',
    lang: 'Go',
    langColor: 'bg-cyan-400',
    files: 421,
    size: '12.1 MB',
    queries: 17,
    lastChat: 'Last week',
    status: 'indexed',
    stars: 3,
  },
]

const recentActivity = [
  { repo: 'stripe/stripe-js', q: 'How does PaymentIntent confirmation work?', time: '2h ago', icon: '💳' },
  { repo: 'vercel/next.js', q: 'Where is the App Router file-system routing implemented?', time: '5h ago', icon: '▲' },
  { repo: 'supabase/supabase', q: 'Explain the real-time subscription architecture', time: '1d ago', icon: '⚡' },
]

export default function Dashboard() {
  const [uploading, setUploading] = useState(false)
  const [repoUrl, setRepoUrl] = useState('')
  const [dragging, setDragging] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleUpload = () => {
    if (!repoUrl) return
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      setRepoUrl('')
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-[#080e1a] flex flex-col">
      {/* Top Nav */}
      <header className="glass-strong border-b border-blue-500/10 px-6 h-14 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Code2 size={14} className="text-blue-400" />
            </div>
            <span className="font-bold text-white text-sm">CodeCompass <span className="gradient-text">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-1 glass rounded-lg border border-blue-500/10 px-3 py-1.5">
            <Search size={13} className="text-slate-500" />
            <input
              className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none w-48"
              placeholder="Search repositories..."
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-glow" />
          </button>
          <div className="flex items-center gap-2 glass rounded-lg border border-blue-500/10 px-3 py-1.5 cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">A</div>
            <span className="text-sm text-slate-300 hidden md:block">Alex Chen</span>
            <ChevronDown size={12} className="text-slate-500" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-52 flex-col glass border-r border-blue-500/10 py-4 px-3">
          {[
            { icon: FolderOpen, label: 'Repositories', active: true },
            { icon: MessageSquare, label: 'Chats', active: false },
            { icon: Activity, label: 'Activity', active: false },
            { icon: Star, label: 'Starred', active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
                active
                  ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
          <div className="flex-1" />
          {[
            { icon: Settings, label: 'Settings' },
            { icon: LogOut, label: 'Sign out' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 transition-colors mb-0.5"
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Your Repositories</h1>
                <p className="text-sm text-slate-500">4 indexed repositories · 282 total queries</p>
              </div>
              <button
                onClick={() => setActiveMenu(activeMenu === 'upload' ? null : 'upload')}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all glow-blue"
              >
                <Plus size={16} />
                Add Repository
              </button>
            </div>

            {/* Upload card */}
            {activeMenu === 'upload' && (
              <div className="glass rounded-2xl p-6 border border-blue-500/20 mb-6 animate-slide-up">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Upload size={16} className="text-blue-400" />
                  Upload Repository
                </h3>
                <div
                  onDragOver={e => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => { e.preventDefault(); setDragging(false) }}
                  className={`border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-colors ${
                    dragging ? 'border-blue-400/60 bg-blue-500/5' : 'border-blue-500/20 hover:border-blue-400/40'
                  }`}
                >
                  <Upload size={24} className="text-slate-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Drag & drop a zip file, or</p>
                  <label className="mt-2 inline-block cursor-pointer text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    browse to upload
                    <input type="file" accept=".zip" className="hidden" />
                  </label>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-blue-500/10" />
                  <span className="text-xs text-slate-600">or paste a GitHub URL</span>
                  <div className="flex-1 h-px bg-blue-500/10" />
                </div>
                <div className="flex gap-3">
                  <input
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/owner/repository"
                    className="flex-1 glass border border-blue-500/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400/50 transition-all"
                  />
                  <button
                    onClick={handleUpload}
                    disabled={uploading || !repoUrl}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Indexing...
                      </>
                    ) : (
                      <>
                        <Zap size={14} />
                        Index
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Repos', val: '4', icon: GitBranch, color: 'text-blue-400' },
                { label: 'Total Queries', val: '282', icon: MessageSquare, color: 'text-violet-400' },
                { label: 'Files Indexed', val: '5.7K', icon: FolderOpen, color: 'text-emerald-400' },
                { label: 'Avg Response', val: '180ms', icon: TrendingUp, color: 'text-amber-400' },
              ].map(({ label, val, icon: Icon, color }) => (
                <div key={label} className="glass rounded-xl p-4 border border-blue-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500">{label}</span>
                    <Icon size={14} className={color} />
                  </div>
                  <div className="text-xl font-bold text-white">{val}</div>
                </div>
              ))}
            </div>

            {/* Repo list */}
            <div className="space-y-3 mb-8">
              {repos.map((repo) => (
                <div
                  key={repo.name}
                  className="glass rounded-xl p-5 border border-blue-500/10 hover:border-blue-400/25 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-slate-800/60 border border-blue-500/10 flex items-center justify-center shrink-0">
                        <GitBranch size={16} className="text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-sm font-semibold text-white truncate">{repo.name}</div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                            {repo.lang}
                          </span>
                          <span className="text-xs text-slate-600">{repo.files} files</span>
                          <span className="text-xs text-slate-600">{repo.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="hidden md:flex items-center gap-1 text-xs text-slate-500">
                        <MessageSquare size={12} />
                        {repo.queries} queries
                      </div>
                      <div className="hidden md:flex items-center gap-1 text-xs text-slate-500">
                        <Clock size={12} />
                        {repo.lastChat}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        ✓ Indexed
                      </span>
                      <Link
                        to="/chat"
                        className="flex items-center gap-1.5 text-xs bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg transition-all border border-blue-500/20"
                      >
                        <MessageSquare size={12} />
                        Chat
                      </Link>
                      <button className="p-1.5 text-slate-600 hover:text-slate-400 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Clock size={15} className="text-slate-500" />
                Recent Activity
              </h2>
              <div className="space-y-2">
                {recentActivity.map((a) => (
                  <Link
                    to="/chat"
                    key={a.q}
                    className="flex items-center gap-4 glass rounded-xl p-4 border border-blue-500/10 hover:border-blue-400/25 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800/60 flex items-center justify-center text-sm shrink-0">
                      {a.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-500 font-mono mb-0.5">{a.repo}</div>
                      <div className="text-sm text-slate-300 truncate group-hover:text-white transition-colors">{a.q}</div>
                    </div>
                    <div className="text-xs text-slate-600 shrink-0">{a.time}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
