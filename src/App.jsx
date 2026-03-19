import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import EntryScene from './components/EntryScene';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';

// ---- Theme Context ----
export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [entered, setEntered] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // Mouse-follow glow on hero
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => setShowMain(true), 800);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className="relative min-h-screen"
        style={{ background: 'var(--bg-dark)', color: 'var(--text-primary)', transition: 'background 0.4s, color 0.4s' }}
      >
        <CustomCursor />

        {/* Entry Scene */}
        <AnimatePresence>
          {!entered && (
            <motion.div
              key="entry"
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <EntryScene onEnter={handleEnter} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Portfolio */}
        <AnimatePresence>
          {showMain && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <ParticleBackground />
              <Navbar />
              <main className="relative z-10">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ExperienceSection />
                <ContactSection />
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}
