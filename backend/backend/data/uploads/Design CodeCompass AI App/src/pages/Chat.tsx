import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Code2, Send, Search, ChevronRight, ChevronDown, FileText,
  GitBranch, MessageSquare, Plus, Settings, LayoutDashboard,
  Loader2, Copy, Check, ExternalLink, Folder, File
} from 'lucide-react'

const REPOS = [
  {
    name: 'stripe/stripe-js',
    files: [
      { name: 'src/stripe.ts', type: 'ts' },
      { name: 'src/elements/index.ts', type: 'ts' },
      { name: 'src/payment/intent.ts', type: 'ts' },
      { name: 'src/webhook/handler.ts', type: 'ts' },
    ],
  },
  {
    name: 'vercel/next.js',
    files: [
      { name: 'packages/next/server/app-router.ts', type: 'ts' },
      { name: 'packages/next/src/client/router.tsx', type: 'tsx' },
      { name: 'packages/next/src/lib/router/utils.ts', type: 'ts' },
    ],
  },
]

const INITIAL_MESSAGES = [
  {
    role: 'assistant' as const,
    content: "Hi! I'm CodeCompass AI. I've indexed **stripe/stripe-js** — ask me anything about this codebase. I'll ground every answer in the actual source code.",
    sources: [],
  },
  {
    role: 'user' as const,
    content: 'How does PaymentIntent confirmation work in the client SDK?',
    sources: [],
  },
  {
    role: 'assistant' as const,
    content: `The PaymentIntent confirmation flow in the Stripe.js client SDK works as follows:

**1. Initialization**
When you call \`stripe.confirmPayment()\`, it resolves to \`src/payment/intent.ts:confirmPaymentIntent()\` which validates the client secret format and extracts the PI ID.

**2. Element Submission**
Before confirming, the SDK calls \`elements.submit()\` to collect and validate payment method data from the mounted Elements. This fires the \`change\` event listeners.

**3. API Request**
The SDK makes a POST to Stripe's API via the internal \`_fetch\` wrapper in \`src/stripe.ts:145\`. The request includes:
- \`payment_method\` (newly created or existing)
- \`return_url\` for redirect-based flows
- Any additional data from \`confirmParams\`

**4. 3DS / Redirect Handling**
If the PI requires action (\`requires_action\`), the SDK triggers \`handleNextAction()\` which opens the 3DS modal or redirects to the \`return_url\`.`,
    sources: [
      { file: 'src/payment/intent.ts', line: 42, snippet: 'export async function confirmPaymentIntent(stripe, elements, params)' },
      { file: 'src/stripe.ts', line: 145, snippet: 'async _fetch(method, path, params): Promise<StripeResponse>' },
      { file: 'src/elements/index.ts', line: 87, snippet: 'async submit(): Promise<{ error?: StripeError }>' },
    ],
  },
]

const QUICK_PROMPTS = [
  'Explain the project structure',
  'How is error handling done?',
  'Where is authentication implemented?',
  'What are the main API endpoints?',
]

type Message = typeof INITIAL_MESSAGES[number]

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-300">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
          return <p key={i} className="font-semibold text-white">{line.slice(2, -2)}</p>
        }
        if (line.startsWith('- ')) {
          return <li key={i} className="ml-4 text-slate-300">{renderInline(line.slice(2))}</li>
        }
        if (line === '') return <div key={i} className="h-1" />
        return <p key={i}>{renderInline(line)}</p>
      })}
    </div>
  )
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="font-mono text-xs bg-blue-500/15 text-blue-300 px-1.5 py-0.5 rounded">{part.slice(1, -1)}</code>
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeRepo, setActiveRepo] = useState(0)
  const [expandedRepos, setExpandedRepos] = useState<Set<number>>(new Set([0]))
  const [copied, setCopied] = useState<string | null>(null)
  const [activeSource, setActiveSource] = useState<null | (typeof INITIAL_MESSAGES[2]['sources'][0])>(INITIAL_MESSAGES[2].sources[0])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input, sources: [] }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const reply: Message = {
        role: 'assistant',
        content: `Great question! Let me search through the indexed codebase for you.\n\nBased on the code in **${REPOS[activeRepo].name}**, here's what I found:\n\nThe implementation handles this via a dedicated module. The key entry point is in \`${REPOS[activeRepo].files[0].name}\` where the core logic is encapsulated. It follows a clean separation of concerns pattern with well-defined interfaces between layers.\n\n- The primary function validates inputs before proceeding\n- Error boundaries are established at each stage\n- The response is normalized to a consistent format`,
        sources: [
          { file: REPOS[activeRepo].files[0].name, line: 12, snippet: '// Core implementation' },
          { file: REPOS[activeRepo].files[1]?.name ?? REPOS[activeRepo].files[0].name, line: 34, snippet: '// Supporting utilities' },
        ],
      }
      setMessages(prev => [...prev, reply])
      setActiveSource(reply.sources[0])
      setLoading(false)
    }, 1800)
  }

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleRepo = (i: number) => {
    setExpandedRepos(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const lastSources = [...messages].reverse().find(m => m.role === 'assistant' && m.sources.length > 0)?.sources ?? []

  return (
    <div className="h-screen bg-[#080e1a] flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="glass-strong border-b border-blue-500/10 px-4 h-12 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Code2 size={12} className="text-blue-400" />
            </div>
            <span className="font-bold text-white text-sm">CodeCompass <span className="gradient-text">AI</span></span>
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-sm text-slate-400">
            <GitBranch size={13} />
            <span className="font-mono text-xs">{REPOS[activeRepo].name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 glass border border-blue-500/10 px-2.5 py-1.5 rounded-lg transition-colors">
            <LayoutDashboard size={12} />
            Dashboard
          </Link>
          <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 glass border border-blue-500/10 px-2.5 py-1.5 rounded-lg transition-colors">
            <Plus size={12} />
            New Chat
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar — repos & files */}
        <aside className="hidden lg:flex w-56 flex-col border-r border-blue-500/10 bg-[#0a1220] shrink-0 overflow-y-auto">
          {/* Search */}
          <div className="p-3 border-b border-blue-500/10">
            <div className="flex items-center gap-2 glass rounded-lg border border-blue-500/10 px-3 py-2">
              <Search size={12} className="text-slate-500 shrink-0" />
              <input className="bg-transparent text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none w-full" placeholder="Search files..." />
            </div>
          </div>

          {/* Repos */}
          <div className="flex-1 py-2">
            {REPOS.map((repo, ri) => (
              <div key={repo.name}>
                <button
                  onClick={() => { toggleRepo(ri); setActiveRepo(ri) }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                    activeRepo === ri ? 'text-blue-300 bg-blue-500/10' : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
                  }`}
                >
                  {expandedRepos.has(ri) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <Folder size={12} />
                  <span className="font-mono truncate">{repo.name}</span>
                </button>
                {expandedRepos.has(ri) && (
                  <div className="pl-7">
                    {repo.files.map((f) => (
                      <button
                        key={f.name}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/30 transition-colors text-left"
                      >
                        <File size={11} className="text-slate-600 shrink-0" />
                        <span className="font-mono truncate">{f.name.split('/').pop()}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="p-3 border-t border-blue-500/10 space-y-0.5">
            {[
              { icon: MessageSquare, label: 'Chat History' },
              { icon: Settings, label: 'Settings' },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800/40 transition-colors">
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main chat area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-6 px-4 md:px-8 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Code2 size={14} className="text-white" />
                  </div>
                )}
                <div className={`max-w-2xl ${msg.role === 'user' ? 'order-first' : ''}`}>
                  {msg.role === 'user' ? (
                    <div className="glass rounded-2xl rounded-tr-sm px-4 py-3 border border-blue-500/20 bg-blue-500/10">
                      <p className="text-sm text-slate-200">{msg.content}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="glass rounded-2xl rounded-tl-sm px-5 py-4 border border-blue-500/10">
                        <MarkdownContent content={msg.content} />
                      </div>
                      {msg.sources.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {msg.sources.map((src, si) => (
                            <button
                              key={si}
                              onClick={() => setActiveSource(src)}
                              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all font-mono ${
                                activeSource?.file === src.file
                                  ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                                  : 'glass border-blue-500/10 text-slate-500 hover:text-slate-300 hover:border-blue-400/25'
                              }`}
                            >
                              <FileText size={11} />
                              {src.file.split('/').pop()}:{src.line}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shrink-0 mt-0.5 border border-slate-600/50 text-sm font-bold text-white">
                    A
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
                  <Code2 size={14} className="text-white" />
                </div>
                <div className="glass rounded-2xl rounded-tl-sm px-5 py-4 border border-blue-500/10 flex items-center gap-3">
                  <Loader2 size={14} className="text-blue-400 animate-spin" />
                  <span className="text-sm text-slate-400">Searching codebase</span>
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse-glow"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length < 4 && (
            <div className="px-4 md:px-8 pb-3 flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q) }}
                  className="text-xs glass border border-blue-500/15 text-slate-400 hover:text-slate-200 hover:border-blue-400/30 px-3 py-1.5 rounded-full transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 md:px-8 pb-4 shrink-0">
            <div className="glass-strong rounded-2xl border border-blue-500/20 p-3 focus-within:border-blue-400/40 transition-colors">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                placeholder="Ask anything about the codebase..."
                rows={2}
                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none leading-relaxed"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-mono">{REPOS[activeRepo].name}</span>
                  <span>·</span>
                  <span>Enter to send, Shift+Enter for newline</span>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 disabled:opacity-40 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                >
                  <Send size={12} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right sidebar — sources */}
        <aside className="hidden xl:flex w-72 flex-col border-l border-blue-500/10 bg-[#0a1220] shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-blue-500/10">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Source References</h3>
          </div>

          {lastSources.length > 0 ? (
            <div className="p-3 space-y-3 flex-1">
              {lastSources.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setActiveSource(src)}
                  className={`rounded-xl p-3 cursor-pointer transition-all border ${
                    activeSource?.file === src.file
                      ? 'bg-blue-500/10 border-blue-400/30'
                      : 'glass border-blue-500/10 hover:border-blue-400/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <FileText size={12} className="text-blue-400 shrink-0" />
                      <span className="font-mono text-xs text-slate-300 truncate">{src.file.split('/').pop()}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs text-slate-600 font-mono">:{src.line}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); copyCode(src.snippet) }}
                        className="p-1 text-slate-600 hover:text-slate-400 transition-colors"
                      >
                        {copied === src.snippet ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-xs bg-slate-900/60 rounded-lg p-2.5 text-slate-400 leading-relaxed break-all">
                    {src.snippet}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-slate-600 font-mono">
                    <span className="truncate">{src.file}</span>
                  </div>
                </div>
              ))}

              {/* File viewer placeholder */}
              {activeSource && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">File Preview</h4>
                    <button className="text-slate-600 hover:text-slate-400 transition-colors">
                      <ExternalLink size={12} />
                    </button>
                  </div>
                  <div className="glass rounded-xl border border-blue-500/10 overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/40 border-b border-blue-500/10">
                      <FileText size={11} className="text-blue-400" />
                      <span className="font-mono text-xs text-slate-400 truncate">{activeSource.file}</span>
                    </div>
                    <div className="p-3 font-mono text-xs text-slate-500 space-y-1 leading-6">
                      {Array.from({ length: 8 }, (_, i) => {
                        const lineNum = activeSource.line - 3 + i
                        const isHighlight = lineNum === activeSource.line
                        return (
                          <div
                            key={i}
                            className={`flex gap-3 px-2 rounded ${isHighlight ? 'bg-blue-500/15 text-blue-300' : ''}`}
                          >
                            <span className="text-slate-700 select-none w-4 text-right shrink-0">{lineNum}</span>
                            <span className={isHighlight ? 'text-blue-300' : 'text-slate-500'}>
                              {isHighlight ? activeSource.snippet : '  // ...'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <FileText size={24} className="text-slate-700 mx-auto mb-3" />
                <p className="text-xs text-slate-600">Sources will appear here as you chat</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
