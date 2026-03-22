import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import cinematicHero from '@/assets/cinematic-hero.jpg';

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
        {/* Photorealistic hero image with cinematic zoom */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{
            scale: phase >= 1 ? [1.1, 1.0] : 1.1,
            opacity: phase >= 1 ? 1 : 0,
          }}
          transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative w-[55vmin] h-[55vmin] max-w-[420px] max-h-[420px] rounded-full overflow-hidden shadow-2xl">
            <img
              src={cinematicHero}
              alt="Lotus, golden flute, and peacock feather"
              className="w-full h-full object-cover"
            />
            {/* Soft vignette on the image */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 0 0 60px 30px rgba(10,3,5,0.5)',
              }}
            />
          </div>
        </motion.div>

        {/* Golden ambient light sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: [0, 0.15, 0.05] } : {}}
          transition={{ duration: 3, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(135deg, transparent 20%, hsl(43 65% 52% / 0.12) 50%, transparent 80%)',
          }}
        />

        {/* Logo + Tagline */}
        {/* Logo above */}
        <motion.h1
          className="absolute top-[12%] md:top-[15%] font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] z-10"
          style={{
            background: 'linear-gradient(110deg, #D4AF37 0%, #E8D48B 40%, #D4AF37 60%, #B76E79 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Radikae
        </motion.h1>

        {/* Tagline below */}
        <motion.div
          className="absolute bottom-[12%] md:bottom-[15%] flex items-center gap-4 z-10"
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

        {/* Skip button */}
        <button
          onClick={onComplete}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 px-5 py-2.5 text-sm font-medium rounded-full border transition-all hover:bg-primary/10 z-20"
          style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.3)' }}
        >
          Skip Intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
