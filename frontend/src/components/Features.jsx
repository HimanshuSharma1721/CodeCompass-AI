import { FileSearch, MessageSquareText, BrainCircuit, Zap } from "lucide-react";

function Features() {
  return (
    <section className="py-14 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            Why CodeCompass AI
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-slate-900">
            Built For Developers
          </h2>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Navigate unfamiliar repositories, understand architecture and
            receive accurate AI answers grounded in your codebase.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* LEFT CARD */}

          <div
            className="
              lg:col-span-2
              rounded-3xl
              border border-blue-900/20
              bg-gradient-to-br
              from-blue-700
              via-blue-800
              to-slate-900
              text-white
              p-7
              shadow-[0_20px_60px_rgba(30,64,175,0.18)]
              flex
              flex-col
              justify-between
            "
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <FileSearch size={24} />
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                Explore Your Repository
              </h3>

              <p className="mt-3 text-slate-300 leading-7">
                Understand folders, files, classes and project architecture
                without spending hours reading documentation.
              </p>
            </div>

            {/* IDE Preview */}

            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/70 backdrop-blur">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>

                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>

                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>

                <span className="text-xs text-slate-400">
                  Repository Preview
                </span>
              </div>

              <div className="grid grid-cols-2">
                {/* Explorer */}

                <div className="border-r border-slate-700 p-5 font-mono text-sm">
                  <p className="text-blue-400">📁 backend</p>

                  <p className="ml-4 text-slate-300">├── app</p>

                  <p className="ml-8 text-slate-500">├── api</p>

                  <p className="ml-8 text-slate-500">├── rag</p>

                  <p className="ml-8 text-slate-500">└── utils</p>

                  <p className="mt-4 text-blue-400">📁 frontend</p>

                  <p className="ml-4 text-slate-300">└── src</p>
                </div>

                {/* AI */}

                <div className="p-5">
                  <div className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                    <p className="font-mono text-sm text-blue-400">
                      &gt; Explain chunker.py
                    </p>
                  </div>

                  <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-4">
                    <p className="text-sm leading-6 text-slate-300">
                      Uses
                      <span className="text-blue-400">
                        {" "}
                        RecursiveCharacterTextSplitter{" "}
                      </span>
                      to divide repository files into semantic chunks before
                      generating embeddings for retrieval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all">
              <MessageSquareText className="text-blue-600" size={24} />

              <h4 className="mt-4 text-lg font-semibold">Chat Naturally</h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ask repository questions in plain English and receive
                context-aware answers.
              </p>
            </div>

            <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all">
              <BrainCircuit className="text-blue-600" size={24} />

              <h4 className="mt-4 text-lg font-semibold">AI Explanations</h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Gemini explains files, functions and architecture with retrieved
                context.
              </p>
            </div>

            <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all">
              <Zap className="text-blue-600" size={24} />

              <h4 className="mt-4 text-lg font-semibold">Semantic Retrieval</h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                LangChain and FAISS fetch only the most relevant code snippets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
