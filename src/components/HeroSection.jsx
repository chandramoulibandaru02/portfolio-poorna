import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../App';
import profilePhoto from '../assets/profile.jpg';

const TYPING_STRINGS = [
  'Computer Science Engineer',
  'AI & ML Enthusiast',
  'Java Developer',
  'Data Explorer',
  'Problem Solver',
];

const WHATSAPP_NUMBER = '919381406664';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Poorna Sai! I came across your portfolio and I'm impressed with your work. I'd love to connect regarding a potential opportunity. Are you available for a quick chat?"
);

function useTypingEffect(strings, speed = 75, pause = 1800) {
  const [text, setText] = useState('');
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setStrIdx((s) => (s + 1) % strings.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, charIdx, deleting, strIdx, strings, speed, pause]);

  return text;
}

function ProfilePhoto() {
  return (
    <div className="profile-photo-wrapper">
      {/* Outer rotating ring */}
      <div className="profile-ring-outer" />

      {/* Corner accent decorations */}
      <div className="profile-corner profile-corner--tl" />
      <div className="profile-corner profile-corner--tr" />
      <div className="profile-corner profile-corner--bl" />
      <div className="profile-corner profile-corner--br" />

      {/* Orbiting dot 1 */}
      <div className="profile-orbit profile-orbit--1">
        <div className="profile-orbit-dot" />
      </div>
      {/* Orbiting dot 2 */}
      <div className="profile-orbit profile-orbit--2">
        <div className="profile-orbit-dot profile-orbit-dot--purple" />
      </div>
      {/* Orbiting dot 3 */}
      <div className="profile-orbit profile-orbit--3">
        <div className="profile-orbit-dot profile-orbit-dot--pink" />
      </div>

      {/* Glow behind image */}
      <div className="profile-glow" />

      {/* The actual photo */}
      <div className="profile-photo-frame">
        <img
          src={profilePhoto}
          alt="Poorna Sai Mukka"
          className="profile-photo-img"
        />
        {/* Shimmer overlay */}
        <div className="profile-photo-shimmer" />
      </div>

      {/* Status badge */}
      <div className="profile-status-badge">
        <span className="profile-status-dot" />
        <span>Available</span>
      </div>

      {/* Decorative floating skill chips */}
      <motion.div
        className="profile-chip profile-chip--top-left"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☕ Java
      </motion.div>
      <motion.div
        className="profile-chip profile-chip--bottom-right"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        🤖 AI/ML
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const typedText = useTypingEffect(TYPING_STRINGS);
  const { theme } = useTheme();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const resumeUrl = '/documents/resume.pdf';
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <section
      id="home"
      className="section grid-bg relative flex items-center"
      style={{ minHeight: '100vh' }}
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,212,255,0.04), transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-4 py-20 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* Left — Text content */}
        <motion.div
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span
              className="text-xs tracking-[0.3em] uppercase px-3 py-1 rounded-full"
              style={{
                color: 'var(--neon-blue)',
                border: '1px solid rgba(0,212,255,0.3)',
                background: 'rgba(0,212,255,0.06)',
                fontFamily: 'Space Grotesk, Inter, sans-serif',
              }}
            >
              ⚡ Available for Opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black leading-tight mb-4"
            style={{ fontFamily: 'Orbitron, Space Grotesk, sans-serif' }}
          >
            <span className="block gradient-text">{personalInfo.firstName}</span>
            <span className="block gradient-text">{personalInfo.lastName}</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-6 h-8">
            <span
              className="text-lg md:text-2xl font-semibold"
              style={{ color: 'var(--neon-purple)', fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              {typedText}
              <span
                className="inline-block w-0.5 h-6 ml-1 align-middle"
                style={{
                  background: 'var(--neon-purple)',
                  verticalAlign: 'middle',
                  animation: 'pulse 1s infinite',
                }}
              />
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg mb-8 max-w-xl leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, Space Grotesk, sans-serif' }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <a
              href={resumeUrl}
              download="Poorna_Sai_Mukka_Resume.pdf"
              className="btn-neon"
              data-hover
              style={{
                borderColor: '#22c55e',
                color: '#22c55e',
                background: 'rgba(34,197,94,0.08)',
              }}
            >
              <span>⬇️ Resume</span>
            </a>

            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn-neon" data-hover>
              <span>🔗 GitHub</span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-neon"
              data-hover
              style={{ borderColor: 'var(--neon-purple)', color: 'var(--neon-purple)' }}
            >
              <span>💼 LinkedIn</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-neon"
              data-hover
              style={{ borderColor: '#25d366', color: '#25d366', background: 'rgba(37,211,102,0.06)' }}
            >
              <span>💬 WhatsApp</span>
            </a>

            <button
              className="btn-neon"
              data-hover
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ borderColor: 'var(--neon-pink)', color: 'var(--neon-pink)' }}
            >
              <span>📧 Contact</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex gap-8 mt-10">
            {[
              { label: 'Projects', value: '2+' },
              { label: 'Certifications', value: '3+' },
              { label: 'CGPA', value: '6.16' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  className="text-3xl font-black gradient-text"
                  style={{ fontFamily: 'Orbitron, Space Grotesk, sans-serif' }}
                >
                  {value}
                </div>
                <div
                  className="text-xs mt-1 uppercase tracking-widest"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.7 }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Profile Photo */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          <ProfilePhoto />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 scroll-indicator">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'rgba(0,212,255,0.4)', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Scroll
        </span>
        <div className="w-px h-12" style={{ background: 'linear-gradient(180deg, var(--neon-blue), transparent)' }} />
      </div>
    </section>
  );
}
