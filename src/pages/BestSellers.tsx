import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { bestSellers } from '@/data/products';

export default function BestSellers() {
  return (
    <div className="min-h-screen">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Best Sellers</h1>
            <p className="text-muted-foreground">Our most loved products, curated by our community</p>
          </motion.div>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} variant={product.category === 'jewelry' ? 'jewelry' : 'toy'} />
          ))}
        </div>
      </div>
    </div>
  );
}
