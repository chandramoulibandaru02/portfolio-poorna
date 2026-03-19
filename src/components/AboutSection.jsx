import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

// ============================================================
// ABOUT SECTION — Animated text reveal + floating UI cards
// ============================================================

const InfoCard = ({ icon, label, value, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -6, scale: 1.03 }}
    className="glass-card p-4 flex items-center gap-3 float"
    style={{ animationDelay: `${delay}s` }}
    data-hover
  >
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
      style={{ background: `${color}22`, border: `1px solid ${color}55` }}
    >
      {icon}
    </div>
    <div>
      <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.6 }}>
        {label}
      </div>
      <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
        {value}
      </div>
    </div>
  </motion.div>
);

const StatBadge = ({ value, label, color }) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    className="text-center p-4 glass-card"
  >
    <div className="text-3xl font-black mb-1" style={{ color, fontFamily: 'Orbitron, Space Grotesk, sans-serif' }}>
      {value}
    </div>
    <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.7 }}>
      {label}
    </div>
  </motion.div>
);

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const lines = [
    "Hi! I'm Poorna Sai Mukka, a B.Tech CSE student at Lovely Professional University.",
    "I'm passionate about building intelligent systems that bridge the gap between technology and human experience.",
    "My journey spans Java-based simulations, AI-powered chatbots, and data-driven solutions.",
    "I thrive in collaborative environments and love tackling complex problems with elegant code.",
  ];

  return (
    <section id="about" className="section relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--neon-blue)', fontFamily: 'Space Grotesk, sans-serif' }}>
            WHO AM I
          </p>
          <h2 className="text-4xl md:text-5xl font-black section-header gradient-text">
            About Me
          </h2>
          <div className="mt-4 mx-auto h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-blue), transparent)' }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Avatar + floating cards */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Avatar placeholder glowing ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center text-7xl font-black pulse-ring"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))',
                  border: '2px solid rgba(0,212,255,0.4)',
                  fontFamily: 'Orbitron, sans-serif',
                  color: '#00d4ff',
                }}
              >
                PS
              </div>
              {/* Orbiting dot */}
              <div
                className="absolute w-4 h-4 rounded-full"
                style={{
                  background: '#a855f7',
                  top: '10%',
                  right: '-5%',
                  boxShadow: '0 0 15px #a855f7',
                  animation: 'float 3s ease-in-out infinite',
                }}
              />
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: '#00d4ff',
                  bottom: '15%',
                  left: '-5%',
                  boxShadow: '0 0 12px #00d4ff',
                  animation: 'float 4s ease-in-out infinite reverse',
                }}
              />
            </motion.div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
              <InfoCard icon="🎓" label="University" value="LPU Punjab" delay={0.1} color="#6366f1" />
              <InfoCard icon="📍" label="Location" value="India" delay={0.2} color="#06b6d4" />
              <InfoCard icon="💻" label="Focus" value="AI & Java Dev" delay={0.3} color="#a855f7" />
              <InfoCard icon="📊" label="Degree" value="B.Tech CSE" delay={0.4} color="#f72585" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-2">
              <StatBadge value="2+" label="Projects" color="#00d4ff" />
              <StatBadge value="3" label="Certs" color="#a855f7" />
              <StatBadge value="98%" label="Top Grade" color="#f72585" />
            </div>
          </div>

          {/* Right — Animated text reveal */}
          <div ref={ref} className="space-y-5">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.18, duration: 0.7, ease: 'easeOut' }}
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--text-primary)', fontFamily: 'Inter, Space Grotesk, sans-serif', opacity: 0.85 }}
              >
                {i === 0 && <span className="gradient-text font-bold">Hi!</span>}
                {` ${line.replace('Hi!', '')}`}
              </motion.p>
            ))}

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {['Python', 'Java', 'C++', 'MySQL', 'Power BI', 'Blender', 'Unity'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(0,212,255,0.07)',
                    border: '1px solid rgba(0,212,255,0.22)',
                    color: 'var(--neon-blue)',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Download / contact CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              <a
                href="/documents/resume.pdf"
                download="Poorna_Sai_Mukka_Resume.pdf"
                className="btn-neon text-sm"
                data-hover
                style={{ borderColor: '#22c55e', color: '#22c55e', background: 'rgba(34,197,94,0.08)' }}
              >
                <span>⬇️ Resume</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-neon text-sm"
                data-hover
              >
                <span>✉️ Email Me</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-neon text-sm"
                data-hover
                style={{ borderColor: 'var(--neon-purple)', color: 'var(--neon-purple)' }}
              >
                <span>🔗 LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
