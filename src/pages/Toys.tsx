import { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, Puzzle, Heart, Gamepad2, Blocks } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { toyProducts } from '@/data/products';

const categories = [
  { label: 'All', value: 'all', icon: Blocks },
  { label: 'Baby Toys', value: 'Baby Toys', icon: Baby },
  { label: 'Educational', value: 'Educational Toys', icon: Puzzle },
  { label: 'Soft Toys', value: 'Soft Toys', icon: Heart },
  { label: 'RC Toys', value: 'RC Toys', icon: Gamepad2 },
  { label: 'Activity', value: 'Activity Toys', icon: Blocks },
];

export default function Toys() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? toyProducts : toyProducts.filter(p => p.subcategory === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="toy-gradient py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs uppercase tracking-[0.2em] text-toy-pink font-medium mb-2 block">Joyful Play</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Toys Collection</h1>
            <p className="text-muted-foreground max-w-md mx-auto">Safe, engaging, and full of wonder. Every toy is chosen with care and love.</p>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? 'bg-toy-pink text-card-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
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
            <ProductCard key={product.id} product={product} variant="toy" />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No toys found in this category.</p>
        )}
      </div>
    </div>
  );
}
