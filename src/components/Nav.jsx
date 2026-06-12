import React from 'react'
import { NavLink } from 'react-router-dom'

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: '56px',
    background: 'rgba(0,0,0,0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  logo: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: '-0.3px',
    color: '#fff',
  },
  logoAccent: {
    color: '#2997ff',
  },
  links: {
    display: 'flex',
    gap: '4px',
  },
  link: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
    fontSize: '13px',
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: '8px',
    transition: 'all 0.15s ease',
    letterSpacing: '-0.1px',
  },
  activeLink: {
    color: '#fff',
    background: 'rgba(255,255,255,0.1)',
  },
  badge: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#2997ff',
    display: 'inline-block',
    marginLeft: '6px',
    verticalAlign: 'middle',
    marginBottom: '1px',
  }
}

export default function Nav() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        Smart<span style={styles.logoAccent}>Pull</span>
      </div>
      <div style={styles.links}>
        {[
          { to: '/', label: 'Pull' },
          { to: '/score', label: 'Score' },
          { to: '/email', label: 'Email' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
