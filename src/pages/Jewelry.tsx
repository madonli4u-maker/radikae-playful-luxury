import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Gem, CircleDot, Watch, Gift } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { jewelryProducts } from '@/data/products';

const categories = [
  { label: 'All', value: 'all', icon: Gem },
  { label: 'Necklaces', value: 'Necklaces', icon: Crown },
  { label: 'Earrings', value: 'Earrings', icon: CircleDot },
  { label: 'Rings', value: 'Rings', icon: CircleDot },
  { label: 'Bracelets', value: 'Bracelets', icon: Watch },
  { label: 'Gift Sets', value: 'Gift Sets', icon: Gift },
];

export default function Jewelry() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? jewelryProducts : jewelryProducts.filter(p => p.subcategory === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 velvet-gradient opacity-30 dark:opacity-60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-2 block">Timeless Elegance</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 gold-shimmer inline-block">Jewelry Collection</h1>
            <p className="text-muted-foreground max-w-md mx-auto mt-3">Crafted with precision. Finished with passion. Each piece tells a story of luxury.</p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} variant="jewelry" />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No jewelry found in this category.</p>
        )}
      </div>
    </div>
  );
}
