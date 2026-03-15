import { NavLink } from 'react-router-dom'
import './NavBar.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/chronicle', label: 'Chronicle' },
  { to: '/office', label: 'Office' },
  { to: '/projects', label: 'Projects' },
] as const

export function NavBar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo">
          <span className="navbar__logo-text">LIM Studio</span>
        </NavLink>
        <div className="navbar__links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <a
          className="navbar__github"
          href="https://github.com/mmporong"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}
