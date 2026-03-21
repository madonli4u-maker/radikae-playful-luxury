import { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, Puzzle, Heart, Gamepad2, Blocks, Star, Search, SlidersHorizontal, Sparkles, Gift, Truck, ShieldCheck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { toyProducts, bestSellers } from '@/data/products';
import { Link } from 'react-router-dom';

const categories = [
  { label: 'All Toys', value: 'all', icon: Blocks, color: 'hsl(var(--toy-pink))' },
  { label: 'Baby Toys', value: 'Baby Toys', icon: Baby, color: 'hsl(var(--toy-sky))' },
  { label: 'Educational', value: 'Educational Toys', icon: Puzzle, color: 'hsl(var(--toy-mint))' },
  { label: 'Soft Toys', value: 'Soft Toys', icon: Heart, color: 'hsl(var(--toy-pink))' },
  { label: 'RC Toys', value: 'RC Toys', icon: Gamepad2, color: 'hsl(var(--toy-yellow))' },
  { label: 'Activity', value: 'Activity Toys', icon: Blocks, color: 'hsl(var(--toy-sky))' },
];

const ageGroups = ['0-1 Years', '1-3 Years', '3-5 Years', '5-8 Years', '8+ Years'];

const trustBadges = [
  { icon: ShieldCheck, label: 'Safety Certified', sub: 'BIS & EN71 Compliant' },
  { icon: Truck, label: 'Free Delivery', sub: 'On orders above ₹499' },
  { icon: Gift, label: 'Gift Wrap', sub: 'Available on all orders' },
];

export default function Toys() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filtered = (activeCategory === 'all' ? toyProducts : toyProducts.filter(p => p.subcategory === activeCategory))
    .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const toyBestSellers = bestSellers.filter(p => p.category === 'toys');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section
        className="relative py-10 md:py-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(200 60% 96%) 0%, hsl(340 30% 95%) 40%, hsl(45 60% 95%) 100%)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: 'hsl(var(--toy-pink) / 0.15)' }}>
                <Sparkles className="w-4 h-4 text-toy-pink" />
                <span className="text-xs font-semibold uppercase tracking-wider text-toy-pink">The Kids Nursery</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
                Joyful Toys, <span className="text-toy-pink">Happy Smiles</span>
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto mb-6">
                Safe, engaging, and full of wonder. Every toy is carefully chosen to spark imagination and bring endless joy.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative max-w-md mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search toys..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-toy-pink/30 transition-all"
              />
            </motion.div>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-4 left-8 w-16 h-16 rounded-full opacity-20" style={{ background: 'hsl(var(--toy-sky))' }} />
        <div className="absolute bottom-6 right-12 w-10 h-10 rounded-lg rotate-12 opacity-15" style={{ background: 'hsl(var(--toy-yellow))' }} />
        <div className="absolute top-1/2 right-6 w-6 h-6 rounded-full opacity-20" style={{ background: 'hsl(var(--toy-mint))' }} />
      </section>

      {/* Trust badges */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustBadges.map(badge => (
              <div key={badge.label} className="flex items-center gap-2 text-center md:text-left">
                <badge.icon className="w-5 h-5 text-toy-mint flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">{badge.label}</p>
                  <p className="text-[10px] text-muted-foreground">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => {
            const Icon = cat.icon;
            const active = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-toy-pink text-white border-toy-pink shadow-md'
                    : 'bg-card border-border text-muted-foreground hover:border-toy-pink/40 hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Age group pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs text-muted-foreground font-medium self-center mr-1">Age:</span>
          {ageGroups.map(age => (
            <button key={age} className="px-3 py-1 rounded-full text-xs border border-border text-muted-foreground hover:border-toy-sky hover:text-toy-sky transition-colors whitespace-nowrap">
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> toys
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} variant="toy" />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Baby className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No toys found. Try a different category.</p>
          </div>
        )}
      </div>

      {/* Best Sellers Banner */}
      {toyBestSellers.length > 0 && (
        <section className="py-12" style={{ background: 'linear-gradient(135deg, hsl(45 60% 96%) 0%, hsl(200 50% 96%) 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-toy-yellow" />
                <h2 className="font-serif text-2xl font-bold">Top Picks for Kids</h2>
              </div>
              <Link to="/best-sellers" className="text-sm text-toy-pink font-medium hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {toyBestSellers.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} variant="toy" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
