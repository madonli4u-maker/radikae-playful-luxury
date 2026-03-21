import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 5000),
      setTimeout(() => setPhase(5), 7000),
      setTimeout(() => onComplete(), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0a10 0%, #2B0F1B 40%, #3d1528 70%, #1a0a10 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Ambient particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: 'hsl(43, 65%, 52%)' }}
            initial={{ opacity: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight - 200],
            }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}

        <div className="relative flex flex-col items-center">
          {/* Lotus */}
          <motion.div
            className="relative"
            initial={{ opacity: 0.8, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: phase >= 1 ? [0.8, 1.1, 1.05] : 0.8,
            }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <svg width="160" height="120" viewBox="0 0 160 120" className="drop-shadow-2xl">
              {/* Lotus petals - outer */}
              {[-50, -25, 0, 25, 50].map((angle, i) => (
                <motion.ellipse
                  key={`outer-${i}`}
                  cx="80"
                  cy="70"
                  rx="18"
                  ry="45"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  opacity={0.7}
                  transform={`rotate(${angle}, 80, 70)`}
                  initial={{ ry: 20, opacity: 0.3 }}
                  animate={phase >= 1 ? { ry: 45, opacity: 0.7 } : {}}
                  transition={{ duration: 1.5, delay: i * 0.15, ease: 'easeOut' }}
                />
              ))}
              {/* Inner petals */}
              {[-30, -10, 10, 30].map((angle, i) => (
                <motion.ellipse
                  key={`inner-${i}`}
                  cx="80"
                  cy="70"
                  rx="12"
                  ry="32"
                  fill="hsl(43, 65%, 52%)"
                  fillOpacity={0.15}
                  stroke="#B76E79"
                  strokeWidth="1"
                  transform={`rotate(${angle}, 80, 70)`}
                  initial={{ ry: 12, opacity: 0 }}
                  animate={phase >= 1 ? { ry: 32, opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                />
              ))}
              {/* Center */}
              <motion.circle
                cx="80" cy="68" r="8"
                fill="#D4AF37"
                fillOpacity={0.3}
                initial={{ r: 3 }}
                animate={phase >= 1 ? { r: 8 } : {}}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </svg>
          </motion.div>

          {/* Golden Flute */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, x: -40, y: 20, rotate: -25 }}
            animate={phase >= 2 ? { opacity: 1, x: 0, y: 0, rotate: -20 } : {}}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <svg width="200" height="30" viewBox="0 0 200 30">
              <defs>
                <linearGradient id="fluteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#E8D48B" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="180" height="10" rx="5" fill="url(#fluteGrad)" />
              {[40, 65, 90, 115, 140, 160].map((cx, i) => (
                <circle key={i} cx={cx} cy="15" r="3" fill="#2B0F1B" opacity="0.6" />
              ))}
            </svg>
          </motion.div>

          {/* Peacock feather wrap */}
          <motion.div
            className="absolute"
            initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
            animate={phase >= 3 ? { opacity: 0.7, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <svg width="220" height="140" viewBox="0 0 220 140" className="opacity-60">
              <defs>
                <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a5c3a" />
                  <stop offset="40%" stopColor="#2d8a5e" />
                  <stop offset="60%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#1a5c3a" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 30 120 Q 60 40, 110 30 Q 160 20, 190 50 Q 170 30, 140 35 Q 110 40, 80 70 Q 50 100, 30 120 Z"
                fill="url(#featherGrad)"
                fillOpacity="0.3"
                stroke="#D4AF37"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={phase >= 3 ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5 }}
              />
              {/* Eye of feather */}
              <motion.ellipse
                cx="130" cy="45" rx="15" ry="10"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={phase >= 3 ? { opacity: 0.8 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <motion.circle
                cx="130" cy="45" r="5"
                fill="#1a3d6e"
                initial={{ opacity: 0 }}
                animate={phase >= 3 ? { opacity: 0.7 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
              />
            </svg>
          </motion.div>

          {/* Logo */}
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-bold mt-8 tracking-widest"
            style={{
              background: 'linear-gradient(110deg, #D4AF37 0%, #E8D48B 45%, #D4AF37 55%, #B76E79 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            Radikae
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] mt-4 uppercase"
            style={{ color: '#B76E79' }}
            initial={{ opacity: 0, y: 15 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          >
            Toys for Smile, Jewels for Style
          </motion.p>
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          className="absolute bottom-8 right-8 px-5 py-2.5 text-sm font-medium rounded-full border transition-all hover:bg-primary/10"
          style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.3)' }}
        >
          Skip Intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
