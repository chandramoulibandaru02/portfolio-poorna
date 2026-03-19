import { motion } from 'framer-motion';
import { experience, education, certificates, achievements } from '../data/portfolioData';

// ============================================================
// EXPERIENCE / JOURNEY SECTION — Timeline with motion
// ============================================================

function TimelineNode({ color, active }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="w-4 h-4 rounded-full flex-shrink-0 z-10"
        style={{
          background: color,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}80`,
          border: `2px solid ${color}`,
        }}
      />
    </div>
  );
}

function ExperienceCard({ item, index, side }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card p-6 cursor-default"
      data-hover
      style={{
        boxShadow: `0 4px 30px ${item.color}20`,
        borderColor: `${item.color}40`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${item.color}22`, border: `1px solid ${item.color}55` }}
        >
          {item.icon}
        </div>
        <div>
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
            {item.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: item.color, fontFamily: 'Space Grotesk, sans-serif' }}>
              {item.organization}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${item.color}22`, color: item.color, fontFamily: 'Space Grotesk, sans-serif', border: `1px solid ${item.color}44` }}>
              {item.period}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      {item.details && (
        <ul className="space-y-1.5 mb-3">
          {item.details.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>
              <span style={{ color: item.color, marginTop: '2px', flexShrink: 0 }}>▸</span>
              {d}
            </li>
          ))}
        </ul>
      )}

      {/* Tech badges */}
      {item.tech && (
        <div className="flex flex-wrap gap-1.5">
          {item.tech.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: `${item.color}22`, border: `1px solid ${item.color}44`, color: item.color, fontFamily: 'Space Grotesk, sans-serif' }}>
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function EducationCard({ edu, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card p-5"
      data-hover
      style={{ borderColor: `${edu.color}40`, boxShadow: `0 4px 30px ${edu.color}15` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${edu.color}22`, border: `1px solid ${edu.color}55` }}
        >
          {edu.icon}
        </div>
        <div>
          <h3 className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
            {edu.degree}
          </h3>
          <p className="text-sm font-semibold" style={{ color: edu.color, fontFamily: 'Space Grotesk, sans-serif' }}>
            {edu.institution}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.7 }}>
            {edu.location} • {edu.period}
          </p>
          <span
            className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: `${edu.color}22`, color: edu.color, border: `1px solid ${edu.color}44`, fontFamily: 'Orbitron, sans-serif' }}
          >
            {edu.grade}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="glass-card p-4 flex items-center gap-3"
      data-hover
      style={{ borderColor: `${cert.color}40` }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${cert.color}22`, border: `1px solid ${cert.color}55` }}
      >
        {cert.icon}
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
          {cert.title}
        </p>
        <p className="text-xs" style={{ color: cert.color, fontFamily: 'Space Grotesk, sans-serif' }}>
          {cert.issuer} · {cert.period}
        </p>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--neon-cyan)', fontFamily: 'Space Grotesk, sans-serif' }}>
            MY PATH
          </p>
          <h2 className="text-4xl md:text-5xl font-black section-header gradient-text">
            Journey & Education
          </h2>
          <div className="mt-4 mx-auto h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }} />
        </motion.div>

        {/* Training / Experience */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 flex items-center gap-3"
            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-2xl">💼</span> Training & Experience
          </motion.h3>
          <div className="relative pl-8 border-l" style={{ borderColor: 'rgba(0,212,255,0.2)' }}>
            {experience.map((item, i) => (
              <div key={item.id} className="relative mb-8">
                <div className="absolute -left-10 top-4">
                  <TimelineNode color={item.color} />
                </div>
                <ExperienceCard item={item} index={i} side="right" />
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 flex items-center gap-3"
            style={{ color: '#f0f0ff', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-2xl">🎓</span> Education
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {education.map((edu, i) => (
              <EducationCard key={edu.id} edu={edu} index={i} />
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 flex items-center gap-3"
            style={{ color: '#f0f0ff', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-2xl">🏅</span> Certifications
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6 flex items-center gap-3"
            style={{ color: '#f0f0ff', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-2xl">🏆</span> Achievements
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-5 flex items-center gap-4"
                data-hover
                style={{ borderColor: `${ach.color}40` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${ach.color}22`, border: `1px solid ${ach.color}55`, boxShadow: `0 0 15px ${ach.color}40` }}
                >
                  {ach.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {ach.title}
                  </h4>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif', opacity: 0.75 }}>
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
