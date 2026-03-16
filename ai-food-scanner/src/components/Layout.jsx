import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Leaf, ScanLine, Clock, Info, Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/',        label: 'Home',    icon: Leaf },
  { to: '/scan',    label: 'Scan',    icon: ScanLine },
  { to: '/history', label: 'History', icon: Clock },
  { to: '/about',   label: 'About',   icon: Info },
]

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-sage-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf size={18} className="text-cream-50" strokeWidth={2.5} />
            </div>
            <div className="leading-none">
              <span className="font-display font-700 text-lg text-sage-800 block leading-tight">NutriScan</span>
              <span className="text-[10px] font-mono text-sage-500 tracking-widest uppercase">AI</span>
            </div>
          </NavLink>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-sage-600 text-cream-50 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-100'
                    }`
                  }
                >
                  <Icon size={15} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <NavLink
            to="/scan"
            className="hidden md:flex items-center gap-2 bg-rust-500 hover:bg-rust-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <ScanLine size={15} />
            Scan Now
          </NavLink>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-sage-100 transition-colors"
          >
            {mobileOpen ? <X size={22} className="text-sage-700" /> : <Menu size={22} className="text-sage-700" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-sage-100 mt-2 mx-4 rounded-2xl p-4 shadow-xl">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive ? 'bg-sage-600 text-cream-50' : 'text-sage-700 hover:bg-sage-100'
                      }`
                    }
                  >
                    <Icon size={16} />
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <NavLink
                  to="/scan"
                  className="flex items-center justify-center gap-2 bg-rust-500 text-white px-4 py-3 rounded-xl text-sm font-semibold"
                >
                  <ScanLine size={15} />
                  Scan Now
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-sage-100 bg-cream-100 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-sage-600 rounded-lg flex items-center justify-center">
                <Leaf size={14} className="text-cream-50" />
              </div>
              <span className="font-display font-bold text-sage-800">NutriScan AI</span>
            </div>
            <p className="text-sm text-sage-600 leading-relaxed">
              AI-powered ingredient analysis for smarter, healthier food choices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sage-800 mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className="text-sm text-sage-600 hover:text-sage-800 transition-colors">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sage-800 mb-3 text-sm">Disclaimer</h4>
            <p className="text-xs text-sage-500 leading-relaxed">
              NutriScan AI is for informational purposes only. Always consult a healthcare professional
              for medical dietary advice. Not a substitute for professional nutrition guidance.
            </p>
          </div>
        </div>
        <div className="border-t border-sage-100 py-4 text-center">
          <p className="text-xs text-sage-400">
            Built with Claude AI · {new Date().getFullYear()} NutriScan · Open Source
          </p>
        </div>
      </footer>
    </div>
  )
}
