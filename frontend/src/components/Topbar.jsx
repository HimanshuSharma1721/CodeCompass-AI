import { Bell, Search, UserCircle2 } from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          HELLO THERE!
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Ready to explore another repository?
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search repositories..."
            className="w-72 pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Notification */}

        <button className="relative w-11 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition">

          <Bell
            size={20}
            className="mx-auto text-slate-600"
          />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-500"></span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 pl-2">

          <UserCircle2
            size={38}
            className="text-blue-600"
          />

          <div className="hidden md:block">

            <p className="font-semibold text-slate-900">
              Demo User
            </p>

            <p className="text-sm text-slate-500">
              AI Workspace
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;