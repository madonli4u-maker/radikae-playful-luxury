import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import cinematicHero from '@/assets/cinematic-hero-fullscreen.jpg';

interface Props {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => onComplete(), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{ background: '#0a0305' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Full-screen cinematic hero image with slow zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{
            scale: phase >= 1 ? [1.15, 1.0] : 1.15,
            opacity: phase >= 1 ? 1 : 0,
          }}
          transition={{ duration: 6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={cinematicHero}
            alt="Lotus, golden flute, and peacock feather"
            className="w-full h-full object-cover"
          />
          {/* Cinematic vignette overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,3,5,0.6) 70%, rgba(10,3,5,0.9) 100%)',
            }}
          />
          {/* Top & bottom cinematic letterbox bars */}
          <div
            className="absolute inset-x-0 top-0 h-[8%]"
            style={{ background: 'linear-gradient(to bottom, rgba(10,3,5,0.8), transparent)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[8%]"
            style={{ background: 'linear-gradient(to top, rgba(10,3,5,0.8), transparent)' }}
          />
        </motion.div>

        {/* Golden ambient light sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: [0, 0.2, 0.06] } : {}}
          transition={{ duration: 4, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(135deg, transparent 20%, hsl(43 65% 52% / 0.15) 50%, transparent 80%)',
          }}
        />

        {/* Logo above */}
        <motion.h1
          className="absolute top-[10%] md:top-[12%] font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] z-10"
          style={{
            background: 'linear-gradient(110deg, #D4AF37 0%, #E8D48B 40%, #D4AF37 60%, #B76E79 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Radikae
        </motion.h1>

        {/* Tagline below */}
        <motion.div
          className="absolute bottom-[10%] md:bottom-[12%] flex items-center gap-4 z-10"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        >
          <span className="w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <p
            className="text-sm md:text-base tracking-[0.3em] uppercase"
            style={{ color: '#B76E79' }}
          >
            Toys for Smile, Jewels for Style
          </p>
          <span className="w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </motion.div>

        {/* Skip button — minimal elegant */}
        <button
          onClick={onComplete}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase rounded-full border transition-all hover:bg-white/5 z-20"
          style={{ color: 'rgba(212,175,55,0.7)', borderColor: 'rgba(212,175,55,0.2)' }}
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
