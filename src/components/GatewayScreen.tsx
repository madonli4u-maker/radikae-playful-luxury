import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Baby, ArrowRight } from 'lucide-react';
import kidsGateway from '@/assets/kids-gateway.jpg';
import jewelryGateway from '@/assets/jewelry-gateway.jpg';

export default function GatewayScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(135deg, hsl(340 60% 6%) 0%, hsl(340 55% 10%) 50%, hsl(340 50% 8%) 100%)',
      }}
    >
      {/* Brand */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide gold-shimmer">
          Radikae
        </h1>
        <p className="text-sm md:text-base tracking-[0.25em] uppercase mt-3" style={{ color: '#B76E79' }}>
          Choose Your World
        </p>
      </motion.div>

      {/* Gateway Cards */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl w-full">
        {/* Kids Nursery */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            to="/toys"
            className="group block relative overflow-hidden rounded-2xl aspect-[3/4] md:aspect-[4/5]"
            style={{
              boxShadow: '0 0 60px hsl(45 90% 60% / 0.08), 0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <img
              src={kidsGateway}
              alt="Kids Nursery"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(10,3,5,0.85) 0%, rgba(10,3,5,0.3) 40%, transparent 70%)',
              }}
            />
            {/* Warm glow overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(ellipse at bottom center, hsl(45 90% 60% / 0.1) 0%, transparent 70%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Baby className="w-5 h-5" style={{ color: '#E8D48B' }} />
                <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#E8D48B' }}>
                  Warmth & Wonder
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Kids Nursery
              </h2>
              <p className="text-sm text-white/60 mb-4 max-w-xs">
                A joyful world of safe, engaging toys curated with love and care.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: '#E8D48B' }}>
                Enter Nursery <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Jewellery Vault */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            to="/jewelry"
            className="group block relative overflow-hidden rounded-2xl aspect-[3/4] md:aspect-[4/5]"
            style={{
              boxShadow: '0 0 60px hsl(43 65% 52% / 0.1), 0 20px 40px rgba(0,0,0,0.4)',
              border: '1px solid hsl(43 65% 52% / 0.15)',
            }}
          >
            <img
              src={jewelryGateway}
              alt="Jewellery Vault"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(10,3,5,0.85) 0%, rgba(10,3,5,0.3) 40%, transparent 70%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(ellipse at bottom center, hsl(43 65% 52% / 0.1) 0%, transparent 70%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-5 h-5" style={{ color: '#D4AF37' }} />
                <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#D4AF37' }}>
                  Timeless Luxury
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Jewellery Vault
              </h2>
              <p className="text-sm text-white/60 mb-4 max-w-xs">
                Exquisite craftsmanship. Premium finish. Pieces that transcend time.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: '#D4AF37' }}>
                Enter Vault <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Subtle brand footer */}
      <motion.p
        className="mt-12 text-xs tracking-[0.2em] uppercase"
        style={{ color: 'hsl(350 25% 40%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Toys for Smile, Jewels for Style
      </motion.p>
    </div>
  );
}
