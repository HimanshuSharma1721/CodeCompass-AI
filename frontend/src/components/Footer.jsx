import { Terminal, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Top */}

        <div className="flex flex-col lg:flex-row justify-between gap-10">

          {/* Left */}

          <div className="max-w-md">

            <h2 className="text-3xl font-bold">
              CodeCompass AI
            </h2>

            <p className="mt-3 text-slate-400 leading-7">
              Understand unfamiliar repositories using AI-powered semantic
              search, Retrieval-Augmented Generation, and natural language
              conversations.
            </p>

          </div>

          {/* Right */}

          <div className="flex gap-16">

            <div>

              <h3 className="font-semibold mb-4">
                Navigation
              </h3>

              <div className="flex flex-col gap-2 text-slate-400">

                <a href="#" className="hover:text-white transition">
                  Home
                </a>

                <a href="#" className="hover:text-white transition">
                  Features
                </a>

                <a href="#" className="hover:text-white transition">
                  Contact
                </a>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-4">
                Resources
              </h3>

              <div className="flex flex-col gap-3 text-slate-400">

                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Terminal size={17} />
                  Documentation
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Mail size={17} />
                  Contact
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-slate-500">
            © 2026 CodeCompass AI. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0 text-sm font-mono text-blue-400">
            &gt; Waiting for your next repository...
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;