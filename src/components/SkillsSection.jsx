import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';

// ============================================================
// SKILLS SECTION — 3D bar chart + hover glow cards
// ============================================================

const CATEGORIES = ['All', 'Languages', 'Frameworks', 'Tools', 'Core CS', 'Soft Skills'];

function SkillBar({ skill, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
    >
      <motion.div
        className="glass-card p-4 cursor-pointer"
        whileHover={{ scale: 1.02, y: -4 }}
        style={{
          boxShadow: hovered ? `0 0 20px ${skill.color}40` : 'none',
          borderColor: hovered ? `${skill.color}80` : 'rgba(0,212,255,0.2)',
          transition: 'box-shadow 0.3s, border-color 0.3s',
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-sm font-semibold"
            style={{ color: hovered ? skill.color : 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif', transition: 'color 0.3s' }}
          >
            {skill.name}
          </span>
          <motion.span
            className="text-xs font-bold"
            style={{ color: skill.color, fontFamily: 'Orbitron, sans-serif' }}
            animate={{ scale: hovered ? 1.2 : 1 }}
          >
            {skill.level}%
          </motion.span>
        </div>

        {/* Progress track */}
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}bb)`,
              boxShadow: hovered ? `0 0 12px ${skill.color}` : `0 0 6px ${skill.color}80`,
              transition: 'box-shadow 0.3s',
            }}
          />
        </div>

        {/* Category tag */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="mt-2 text-[10px] uppercase tracking-widest block"
          style={{ color: skill.color, fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {skill.category}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

function SkillOrb({ skill, angle, radius }) {
  const [hovered, setHovered] = useState(false);
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{ left: `calc(50% + ${x}px - 36px)`, top: `calc(50% + ${y}px - 36px)` }}
      whileHover={{ scale: 1.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
    >
      <div
        className="w-18 h-18 rounded-full flex flex-col items-center justify-center text-center cursor-pointer"
        style={{
          width: '72px',
          height: '72px',
          background: hovered ? `${skill.color}22` : 'rgba(255,255,255,0.04)',
          border: `2px solid ${hovered ? skill.color : skill.color + '60'}`,
          boxShadow: hovered ? `0 0 20px ${skill.color}, 0 0 40px ${skill.color}60` : 'none',
          transition: 'all 0.3s',
        }}
      >
        <span className="text-[9px] font-bold text-center leading-tight px-1" style={{ color: hovered ? skill.color : 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif' }}>
          {skill.name}
        </span>
        <span className="text-[10px] font-black mt-0.5" style={{ color: skill.color, fontFamily: 'Orbitron, sans-serif' }}>
          {skill.level}
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--neon-purple)', fontFamily: 'Space Grotesk, sans-serif' }}>
            WHAT I KNOW
          </p>
          <h2 className="text-4xl md:text-5xl font-black section-header gradient-text">
            Skills & Expertise
          </h2>
          <div className="mt-4 mx-auto h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-purple), transparent)' }} />
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              data-hover
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                background: activeCategory === cat ? 'linear-gradient(135deg, #00d4ff, #a855f7)' : 'rgba(255,255,255,0.04)',
                color: activeCategory === cat ? '#000' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === cat ? 'transparent' : 'var(--border-glow)'}`,
                boxShadow: activeCategory === cat ? '0 0 15px rgba(0,212,255,0.5)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill bars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Visual orb section (show all) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 relative flex items-center justify-center hide-mobile"
        >
          {/* Center orb */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-center z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(168,85,247,0.2))',
              border: '2px solid rgba(0,212,255,0.4)',
              boxShadow: '0 0 40px rgba(0,212,255,0.3)',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            <span className="text-xs text-center" style={{ color: '#00d4ff' }}>SKILL<br />MAP</span>
          </div>

          {/* Orbiting skill orbs (top 8) */}
          <div className="absolute" style={{ width: '480px', height: '480px' }}>
            {skills.slice(0, 8).map((skill, i) => (
              <SkillOrb
                key={skill.name}
                skill={skill}
                angle={(i / 8) * 360}
                radius={180}
              />
            ))}
          </div>
          {/* empty space for orbs */}
          <div style={{ width: '480px', height: '480px' }} />
        </motion.div>
      </div>
    </section>
  );
}
