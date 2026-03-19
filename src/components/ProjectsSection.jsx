import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';

// ============================================================
// PROJECTS SECTION — 3D tilt cards + animated modal
// ============================================================

function TiltCard({ project, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      data-hover
      className="cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.02)' : 'scale(1)'}`,
        transition: 'transform 0.2s ease',
      }}
    >
      <div
        className="glass-card overflow-hidden h-full"
        style={{
          boxShadow: hovered ? `0 20px 60px ${project.glowColor}40, 0 0 30px ${project.glowColor}20` : '0 4px 20px rgba(0,0,0,0.3)',
          borderColor: hovered ? `${project.glowColor}80` : 'rgba(0,212,255,0.2)',
          transition: 'box-shadow 0.3s, border-color 0.3s',
        }}
      >
        {/* Header gradient bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${project.glowColor}, transparent)` }}
        />

        {/* Card body */}
        <div className="p-6">
          {/* Icon + title */}
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${project.glowColor}22, ${project.glowColor}11)`,
                border: `1px solid ${project.glowColor}44`,
                boxShadow: hovered ? `0 0 20px ${project.glowColor}60` : 'none',
                transition: 'box-shadow 0.3s',
              }}
            >
              {project.icon}
            </div>
            <div>
              <h3
                className="text-lg font-bold leading-tight"
                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {project.title}
              </h3>
              <span className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.7 }}>
                {project.period}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed line-clamp-3 mb-4"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif', opacity: 0.9 }}
          >
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: `${project.glowColor}22`,
                  border: `1px solid ${project.glowColor}44`,
                  color: project.glowColor,
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: project.glowColor, fontFamily: 'Space Grotesk, sans-serif' }}>
            <span>View Details</span>
            <motion.span animate={{ x: hovered ? 4 : 0 }}>→</motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(2,0,16,0.85)', backdropFilter: 'blur(10px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 60, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="glass-card max-w-2xl w-full overflow-hidden"
            style={{ borderColor: `${project.glowColor}60`, boxShadow: `0 0 60px ${project.glowColor}40` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header gradient */}
            <div
              className="h-2 w-full"
              style={{ background: `linear-gradient(90deg, ${project.glowColor}, #a855f7, transparent)` }}
            />

            <div className="p-8">
              {/* Close button */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ background: `${project.glowColor}22`, border: `1px solid ${project.glowColor}44` }}
                  >
                    {project.icon}
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-black"
                      style={{ color: 'var(--text-primary)', fontFamily: 'Orbitron, Space Grotesk, sans-serif' }}
                    >
                      {project.title}
                    </h3>
                    <span className="text-sm" style={{ color: project.glowColor, fontFamily: 'Space Grotesk, sans-serif' }}>
                      {project.period}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  data-hover
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:rotate-90"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', opacity: 0.88 }}>
                {project.description}
              </p>

              {/* Bullet points */}
              <ul className="space-y-3 mb-6">
                {project.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif', opacity: 0.9 }}
                  >
                    <span style={{ color: project.glowColor, marginTop: '3px', flexShrink: 0 }}>▸</span>
                    {b}
                  </motion.li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.65 }}>
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        background: `${project.glowColor}22`,
                        border: `1px solid ${project.glowColor}55`,
                        color: project.glowColor,
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn-neon text-sm"
                data-hover
                style={{ borderColor: project.glowColor, color: project.glowColor }}
              >
                <span>🔗 View on GitHub</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--neon-pink)', fontFamily: 'Space Grotesk, sans-serif' }}>
            WHAT I'VE BUILT
          </p>
          <h2 className="text-4xl md:text-5xl font-black section-header gradient-text">
            Projects
          </h2>
          <div className="mt-4 mx-auto h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-pink), transparent)' }} />
        </motion.div>

        {/* Project card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <TiltCard key={project.id} project={project} onOpen={setSelectedProject} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/poornasai18"
            target="_blank"
            rel="noreferrer"
            className="btn-neon"
            data-hover
          >
            <span>🔗 View All on GitHub</span>
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
