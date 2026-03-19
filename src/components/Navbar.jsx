import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

// ============================================================
// NAVBAR — Glassy fixed navbar with theme toggle
// ============================================================

const NAV_LINKS = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'projects',   label: 'Projects' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact',    label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const scrollMid = window.scrollY + window.innerHeight / 3;
      sections.forEach((sec) => {
        if (sec && sec.offsetTop <= scrollMid && sec.offsetTop + sec.offsetHeight > scrollMid) {
          setActive(sec.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="navbar"
      style={{
        boxShadow: scrolled
          ? isDark ? '0 4px 30px rgba(0,212,255,0.1)' : '0 4px 30px rgba(14,165,233,0.12)'
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group" data-hover>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black"
            style={{
              background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              color: '#fff',
              boxShadow: '0 0 12px rgba(0,212,255,0.4)',
              letterSpacing: '0.05em',
            }}
          >
            PS
          </div>
          <span
            className="text-sm font-black hidden sm:block"
            style={{
              fontFamily: 'Orbitron, Space Grotesk, sans-serif',
              background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.08em',
            }}
          >
            POORNA.DEV
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              data-hover
              onClick={() => scrollTo(link.id)}
              className="relative px-4 py-2 text-sm font-medium transition-all duration-300"
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                color: active === link.id ? 'var(--neon-blue)' : 'var(--text-secondary)',
              }}
            >
              {active === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}
                  transition={{ type: 'spring', bounce: 0.2 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            data-hover
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300"
            style={{
              background: isDark ? 'rgba(0,212,255,0.08)' : 'rgba(14,165,233,0.1)',
              border: `1px solid ${isDark ? 'rgba(0,212,255,0.25)' : 'rgba(14,165,233,0.3)'}`,
              color: 'var(--neon-blue)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span style={{ fontSize: '16px' }}>{isDark ? '☀️' : '🌙'}</span>
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {/* Hire Me button */}
          <button
            data-hover
            onClick={() => scrollTo('contact')}
            className="hidden md:block btn-neon text-xs"
            style={{ padding: '0.45rem 1.1rem' }}
          >
            <span>Hire Me</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-hover
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-0.5 w-6 transition-all duration-300"
                style={{
                  background: 'var(--neon-blue)',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translateY(8px)'
                    : i === 2 ? 'rotate(-45deg) translateY(-8px)'
                    : 'none'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="md:hidden border-t px-4 py-4 flex flex-col gap-2"
            style={{ borderColor: 'var(--border-glow)', background: 'var(--navbar-bg)' }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: active === link.id ? 'var(--neon-blue)' : 'var(--text-secondary)',
                  background: active === link.id ? 'rgba(0,212,255,0.08)' : 'transparent',
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="text-left px-4 py-3 rounded-lg text-sm font-medium"
              style={{ color: 'var(--neon-blue)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
