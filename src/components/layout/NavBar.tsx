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
      <div className="navbar__brand">
        <span className="navbar__logo">LIM</span>
        <span className="navbar__studio">Studio</span>
      </div>
      <ul className="navbar__links">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              aria-current={undefined}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
