import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight"
        >
          <span className="text-slate-900">CodeCompass</span>
          <span className="text-blue-600"> AI</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-slate-600 font-medium">

          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-blue-600 transition">
            How It Works
          </a>

          <a href="#tech-stack" className="hover:text-blue-600 transition">
            Tech Stack
          </a>

          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>

        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="text-slate-700 font-medium hover:text-blue-600 transition"
          >
            Sign In
          </Link>

          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            Open Workspace
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;