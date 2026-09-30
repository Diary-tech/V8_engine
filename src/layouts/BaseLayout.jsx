import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import ThemeToggle from '../components/ThemeToggle.jsx'

const navItems = [
  ['Fundamentals', '#'],
  ['Anatomy', '#'],
  ['Configurations', '#'],
  ['Sound', '#'],
  ['History', '#'],
  ['Comparisons', '/cross-plane-vs-flat-plane'],
  ['Learn', '/glossary'],
  ['About', '#']
]

export default function BaseLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <HelmetProvider>
      <div className="site-shell">
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="page-shell header-inner">
            <NavLink className="brand" to="/cross-plane-vs-flat-plane" aria-label="V8 Anatomy home">
              <span className="brand-mark" aria-hidden="true">V8</span>
              <span>ANATOMY</span>
            </NavLink>
            <nav aria-label="Primary navigation" className="desktop-nav">
              {navItems.map(([label, href]) => href === '#'
                ? <span className="nav-placeholder" key={label}>{label}</span>
                : <NavLink key={label} to={href} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
              )}
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <main id="main">
          <Outlet />
        </main>

        <footer className="site-footer">
          <div className="page-shell footer-inner">
            <p>V8 Anatomy — an educational technical reference.</p>
            <p className="mono">STEP 1 / FOUNDATION</p>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  )
}
