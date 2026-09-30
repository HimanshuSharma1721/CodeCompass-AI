import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[620px] rounded-full bg-blue-200 blur-3xl opacity-35"></div>

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
               AI-Powered Repository Intelligence
            </div>

            <h1 className="mt-5 text-5xl font-extrabold leading-tight text-slate-900">
              Understand Any
              <br />
              Codebase in
              <span className="text-blue-600"> Minutes,</span>
              <br />
              Not Weeks.
            </h1>

            <p className="mt-5 text-base text-slate-600 leading-7 max-w-xl">
              CodeCompass AI uses Retrieval-Augmented Generation
              to analyse repositories, explain code, answer
              architecture questions and help developers
              understand unfamiliar projects instantly.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">

              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Open Workspace
              </Link>

              <button className="border border-slate-300 bg-white px-6 py-3 rounded-xl hover:bg-slate-100 transition">
                View Demo
              </button>

            </div>

          </div>

          {/* Right */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6">

            <div className="flex items-center justify-between mb-4">

              <div>

                <p className="text-xs text-slate-500">
                  Repository
                </p>

                <h3 className="font-semibold text-slate-900">
                  CodeCompass-AI
                </h3>

              </div>

              <span className="text-sm text-green-600 font-medium">
                ● Indexed
              </span>

            </div>

            <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-mono text-slate-700">
              Explain load_repository()
            </div>

            <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-100 p-4">

              <p className="font-semibold text-blue-700 mb-3">
                AI Response
              </p>

              <div className="space-y-2 text-sm text-slate-700">

                <p>✓ Reads repository files</p>

                <p>✓ Creates LangChain Documents</p>

                <p>✓ Preserves metadata</p>

                <p>✓ Returns processed documents</p>

              </div>

            </div>

            <div className="mt-5 border-t border-slate-200 pt-4">

              <p className="font-semibold text-slate-800 text-sm">
                Sources
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">

                <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                  loader.py
                </span>

                <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                  chunker.py
                </span>

                <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                  embeddings.py
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;