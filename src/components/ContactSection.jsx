import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';

// ============================================================
// CONTACT SECTION — Real EmailJS + WhatsApp + Social links
//
// TO ENABLE EMAIL:
//  1. Go to https://www.emailjs.com/ and create a FREE account
//  2. Create a Service (Gmail recommended) → note the SERVICE_ID
//  3. Create a Template with variables: {{from_name}}, {{from_email}},
//     {{subject}}, {{message}}, {{to_name}}
//     → note TEMPLATE_ID
//  4. Copy your Public Key from Account → API Keys
//  5. Replace the three constants below:
// ============================================================

const EMAILJS_SERVICE_ID  = 'service_xxxxxxx';   // ← replace
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';  // ← replace
const EMAILJS_PUBLIC_KEY  = 'your_public_key';   // ← replace

// WhatsApp
const WHATSAPP_NUMBER = '919381406664';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Poorna Sai! I came across your portfolio and I'm impressed with your work. I'd love to connect regarding a potential opportunity. Are you available for a quick chat?"
);

const socialLinks = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: '✉️', color: '#00d4ff' },
  {
    label: 'WhatsApp',
    value: personalInfo.mobile,
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
    icon: '💬',
    color: '#25d366',
  },
  { label: 'LinkedIn', value: 'poorna-sai-mukka', href: personalInfo.linkedin, icon: '💼', color: '#0077b5' },
  { label: 'GitHub',   value: 'poornasai18',      href: personalInfo.github,   icon: '🐙', color: '#a855f7' },
  { label: 'Mobile',   value: personalInfo.mobile, href: `tel:${personalInfo.mobile}`, icon: '📱', color: '#f72585' },
];

function FloatingInput({ label, type = 'text', name, value, onChange, placeholder, multiline }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative">
      <label
        className="absolute text-xs font-semibold transition-all duration-300 pointer-events-none"
        style={{
          top: focused || hasValue ? '-8px' : '16px',
          left: '16px',
          color: focused ? 'var(--neon-blue)' : 'var(--text-secondary)',
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          fontSize: focused || hasValue ? '10px' : '13px',
          letterSpacing: focused || hasValue ? '0.1em' : '0',
          textTransform: focused || hasValue ? 'uppercase' : 'none',
          background: focused || hasValue ? 'var(--bg-dark)' : 'transparent',
          padding: '0 4px',
          zIndex: 1,
          opacity: 0.9,
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          className="w-full px-4 pt-5 pb-3 rounded-xl text-sm resize-none outline-none transition-all duration-300"
          style={{
            background: 'var(--input-bg)',
            border: `1px solid ${focused ? 'var(--neon-blue)' : 'var(--border-glow)'}`,
            color: 'var(--text-primary)',
            fontFamily: 'Inter, Space Grotesk, sans-serif',
            boxShadow: focused ? '0 0 20px rgba(0,212,255,0.12)' : 'none',
          }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-4 rounded-xl text-sm outline-none transition-all duration-300"
          style={{
            background: 'var(--input-bg)',
            border: `1px solid ${focused ? 'var(--neon-blue)' : 'var(--border-glow)'}`,
            color: 'var(--text-primary)',
            fontFamily: 'Inter, Space Grotesk, sans-serif',
            boxShadow: focused ? '0 0 20px rgba(0,212,255,0.12)' : 'none',
          }}
        />
      )}
    </div>
  );
}

export default function ContactSection() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);

    try {
      // Check if EmailJS is configured
      if (EMAILJS_SERVICE_ID === 'service_xxxxxxx') {
        // Fallback: open mailto
        const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.open(mailtoUrl);
        setSending(false);
        setSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 5000);
        return;
      }

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSending(false);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setSending(false);
      setError('Failed to send. Please try the email link or WhatsApp below.');
      console.error('EmailJS error:', err);
    }
  };

  return (
    <section id="contact" className="section relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: 'var(--neon-pink)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            GET IN TOUCH
          </p>
          <h2 className="text-4xl md:text-5xl font-black section-header gradient-text">
            Contact Me
          </h2>
          <div className="mt-4 mx-auto h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-pink), transparent)' }} />
          <p
            className="mt-6 text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, Space Grotesk, sans-serif' }}
          >
            Have an opportunity or just want to say hello? I'd love to connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Social links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              Let's Connect
            </h3>

            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center gap-4 glass-card p-4 group"
                data-hover
                style={{ borderColor: `${s.color}35`, textDecoration: 'none' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}50`, boxShadow: `0 0 12px ${s.color}25` }}
                >
                  {s.icon}
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-0.5"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.6 }}
                  >
                    {s.label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: s.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                    {s.value}
                  </p>
                </div>
                <motion.span
                  className="ml-auto text-lg"
                  style={{ color: s.color }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                >
                  →
                </motion.span>
              </motion.a>
            ))}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl mt-2"
              style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 pulse-ring"
                style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}
              />
              <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="font-semibold" style={{ color: '#22c55e' }}>Available</span> for internships & freelance projects
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12 gap-4"
              >
                <div className="text-6xl mb-2">🚀</div>
                <h3
                  className="text-2xl font-bold gradient-text"
                  style={{ fontFamily: 'Orbitron, Space Grotesk, sans-serif' }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>
                  Thanks for reaching out! I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <h3
                  className="text-lg font-bold mb-6"
                  style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  Send a Message
                </h3>

                {/* Hidden field for EmailJS template */}
                <input type="hidden" name="to_name" value="Poorna Sai" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingInput label="Your Name" name="from_name" value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} />
                  <FloatingInput label="Email Address" type="email" name="from_email" value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} />
                </div>
                <FloatingInput label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
                <FloatingInput label="Message" name="message" value={formData.message} onChange={handleChange} multiline />

                {error && (
                  <p className="text-xs text-center py-2 rounded-lg" style={{ color: '#f72585', background: 'rgba(247,37,133,0.08)', border: '1px solid rgba(247,37,133,0.2)' }}>
                    {error}
                  </p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-hover
                  disabled={sending}
                  className="w-full py-4 rounded-xl font-bold text-sm relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(168,85,247,0.18))',
                    border: '1px solid var(--border-glow)',
                    color: 'var(--neon-blue)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.1em',
                    cursor: sending ? 'wait' : 'pointer',
                  }}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border-2 animate-spin"
                        style={{ borderColor: 'var(--neon-blue)', borderTopColor: 'transparent' }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <span>⚡ SEND MESSAGE</span>
                  )}
                </motion.button>

                <p
                  className="text-xs text-center mt-2"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.5 }}
                >
                  Or reach me directly via WhatsApp for faster response
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center pb-8"
      >
        <div className="h-px w-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, var(--border-glow), transparent)' }} />
        <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.5 }}>
          Built with ❤️ by{' '}
          <span className="gradient-text font-semibold">Poorna Sai Mukka</span>
          {' '}• 2025
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif', opacity: 0.3 }}>
          React · Three.js · Framer Motion · Tailwind CSS · EmailJS
        </p>
      </motion.div>
    </section>
  );
}
