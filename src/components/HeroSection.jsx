import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../App';

// ============================================================
// HERO SECTION — Typing animation + 3D rotating skill sphere
// ============================================================

const TYPING_STRINGS = [
  'Computer Science Engineer',
  'AI & ML Enthusiast',
  'Java Developer',
  'Data Explorer',
  'Problem Solver',
];

// WhatsApp number (no +, no spaces)
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

// 3D rotating sphere with skill tags
function SkillSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 5;

    scene.add(new THREE.AmbientLight(0x204060, 3));
    const dirLight = new THREE.DirectionalLight(0x00d4ff, 4);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const purpleLight = new THREE.PointLight(0xa855f7, 3, 20);
    purpleLight.position.set(-5, -3, 2);
    scene.add(purpleLight);

    const sphereGeo = new THREE.SphereGeometry(1.2, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a2e,
      emissive: 0x00153a,
      emissiveIntensity: 1,
      roughness: 0.4,
      metalness: 0.9,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.12 });
    scene.add(new THREE.Mesh(sphereGeo, wireMat));

    const ringColors = [0x00d4ff, 0xa855f7, 0xf72585];
    ringColors.forEach((color, i) => {
      const rGeo = new THREE.TorusGeometry(1.8 + i * 0.3, 0.015, 16, 200);
      const rMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 - i * 0.1 });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / (2 + i);
      ring.rotation.y = (i * Math.PI) / 3;
      scene.add(ring);
    });

    const skillNames = ['Python', 'Java', 'C++', 'SQL', 'DSA', 'Blender', 'Unity', 'Power BI'];
    const nodeGroup = new THREE.Group();
    skillNames.forEach((_, i) => {
      const angle = (i / skillNames.length) * Math.PI * 2;
      const r = 2.5;
      const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x00d4ff : 0xa855f7, transparent: true, opacity: 0.9 });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * r, Math.sin(angle * 0.7) * 1.2, Math.sin(angle) * r);
      nodeGroup.add(node);
    });
    scene.add(nodeGroup);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let t = 0;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.008;
      sphere.rotation.y += 0.005;
      sphere.rotation.x = Math.sin(t * 0.5) * 0.2;
      nodeGroup.rotation.y = t * 0.4 + mouseX * 0.5;
      nodeGroup.rotation.x = Math.sin(t * 0.3) * 0.3 + mouseY * 0.2;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}

export default function HeroSection() {
  const typedText = useTypingEffect(TYPING_STRINGS);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  // Check if resume exists
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

      <div className="max-w-7xl mx-auto w-full px-4 py-20 flex flex-col lg:flex-row items-center gap-12 relative z-10">
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
            {/* Download Resume */}
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
              title="Download Resume — place your resume.pdf in public/documents/"
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

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-neon"
              data-hover
              style={{ borderColor: '#25d366', color: '#25d366', background: 'rgba(37,211,102,0.06)' }}
              title="Message on WhatsApp (message pre-typed for hiring managers)"
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

        {/* Right — 3D Scene */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <div
            className="relative"
            style={{ width: '420px', height: '420px', maxWidth: '90vw', maxHeight: '90vw' }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(0,212,255,0.12) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            <SkillSphere />
            {['Python', 'Java', 'C++', 'DSA', 'SQL'].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.2 }}
                className="absolute glass-card px-2 py-1 text-xs font-semibold"
                style={{
                  left: `${5 + (i % 2) * 55}%`,
                  top: `${10 + i * 16}%`,
                  color: 'var(--neon-blue)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.05em',
                  zIndex: 10,
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
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
