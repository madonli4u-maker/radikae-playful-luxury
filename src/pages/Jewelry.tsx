import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Gem, CircleDot, Watch, Gift, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { jewelryProducts, bestSellers } from '@/data/products';
import { Link } from 'react-router-dom';
import jewelryGateway from '@/assets/jewelry-gateway.jpg';

const categories = [
  { label: 'All Pieces', value: 'all', icon: Gem },
  { label: 'Necklaces', value: 'Necklaces', icon: Crown },
  { label: 'Earrings', value: 'Earrings', icon: CircleDot },
  { label: 'Rings', value: 'Rings', icon: CircleDot },
  { label: 'Bracelets', value: 'Bracelets', icon: Watch },
  { label: 'Gift Sets', value: 'Gift Sets', icon: Gift },
];

export default function Jewelry() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? jewelryProducts : jewelryProducts.filter(p => p.subcategory === activeCategory);
  const jewelryBestSellers = bestSellers.filter(p => p.category === 'jewelry');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, hsl(340 60% 6%) 0%, hsl(340 55% 9%) 50%, hsl(340 50% 7%) 100%)' }}>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={jewelryGateway} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(340 60% 6% / 0.7) 0%, hsl(340 60% 6%) 100%)' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, hsl(43 65% 52%))' }} />
              <Sparkles className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#D4AF37' }}>
                The Jewellery Vault
              </span>
              <Sparkles className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span className="w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, hsl(43 65% 52%))' }} />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 gold-shimmer inline-block">
              Timeless Elegance
            </h1>
            <p className="text-base md:text-lg max-w-lg mx-auto mt-3" style={{ color: '#B76E79' }}>
              Crafted with precision. Finished with passion. Each piece tells a story of unmatched luxury.
            </p>
          </motion.div>
        </div>

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none" style={{ background: 'radial-gradient(ellipse, hsl(43 65% 52% / 0.08) 0%, transparent 70%)' }} />
      </section>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(cat => {
            const Icon = cat.icon;
            const active = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border"
                style={{
                  background: active ? 'hsl(43 65% 52%)' : 'hsl(340 55% 12% / 0.8)',
                  color: active ? 'hsl(340 60% 8%)' : '#B76E79',
                  borderColor: active ? 'hsl(43 65% 52%)' : 'hsl(43 65% 52% / 0.15)',
                  boxShadow: active ? '0 0 20px hsl(43 65% 52% / 0.2)' : 'none',
                }}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: '#B76E79' }}>
            <span className="font-semibold" style={{ color: '#D4AF37' }}>{filtered.length}</span> exquisite pieces
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} variant="jewelry" />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Gem className="w-12 h-12 mx-auto mb-3" style={{ color: 'hsl(43 65% 52% / 0.3)' }} />
            <p style={{ color: '#B76E79' }}>No pieces found in this collection.</p>
          </div>
        )}
      </div>

      {/* Best Sellers */}
      {jewelryBestSellers.length > 0 && (
        <section className="py-12 mt-8" style={{ borderTop: '1px solid hsl(43 65% 52% / 0.1)' }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5" style={{ color: '#D4AF37' }} />
                <h2 className="font-serif text-2xl font-bold" style={{ color: '#E8D48B' }}>Most Coveted</h2>
              </div>
              <Link to="/best-sellers" className="text-sm font-medium hover:underline" style={{ color: '#D4AF37' }}>
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {jewelryBestSellers.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} variant="jewelry" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom spacer with brand */}
      <div className="text-center py-12">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'hsl(350 25% 30%)' }}>
          Radikae — Jewels for Style
        </p>
      </div>
    </div>
  );
}
