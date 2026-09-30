"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const isLoggedIn = pathname.startsWith("/dashboard") || 
                     pathname.startsWith("/swap-requests") || 
                     pathname.startsWith("/ratings")

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Skill<span className="text-primary">-Swap</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    pathname === "/dashboard" 
                      ? "bg-primary text-white" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/swap-requests" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    pathname === "/swap-requests" 
                      ? "bg-primary text-white" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Swap Requests
                </Link>
                <Link 
                  href="/ratings" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    pathname === "/ratings" 
                      ? "bg-primary text-white" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Ratings
                </Link>
                <Link 
                  href="/" 
                  className="px-4 py-2 rounded-lg font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 rounded-lg font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-6 py-2 rounded-lg font-semibold gradient-primary text-white glow-primary hover:opacity-90 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      pathname === "/dashboard" 
                        ? "bg-primary text-white" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/swap-requests" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      pathname === "/swap-requests" 
                        ? "bg-primary text-white" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Swap Requests
                  </Link>
                  <Link 
                    href="/ratings" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      pathname === "/ratings" 
                        ? "bg-primary text-white" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ratings
                  </Link>
                  <Link 
                    href="/" 
                    className="px-4 py-2 rounded-lg font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="px-4 py-2 rounded-lg font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="px-4 py-2 rounded-lg font-semibold gradient-primary text-white text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
