import {
  LayoutDashboard,
  FolderGit2,
  MessageSquareText,
  History,
  Settings,
  Compass,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Repositories",
    icon: FolderGit2,
  },
  {
    title: "AI Chat",
    icon: MessageSquareText,
  },
  {
    title: "History",
    icon: History,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800">

      {/* Logo */}

      <div className="h-20 flex items-center px-6 border-b border-slate-800">

        <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">

          <Compass size={22} />

        </div>

        <div className="ml-3">

          <h1 className="font-bold text-lg">
            CodeCompass
          </h1>

          <p className="text-xs text-slate-400">
            AI Workspace
          </p>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 mt-6 px-3">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                item.active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>

            </button>
          );
        })}

      </nav>

      {/* Bottom */}

      <div className="p-5 border-t border-slate-800">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-sm text-slate-400">
            Workspace Status
          </p>

          <div className="flex items-center gap-2 mt-3">

            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>

            <span className="text-sm">
              Ready
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;