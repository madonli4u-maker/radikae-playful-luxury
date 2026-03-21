import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Gift, Crown, Baby } from 'lucide-react';
import heroJewelry from '@/assets/hero-jewelry.jpg';
import heroToys from '@/assets/hero-toys.jpg';
import ProductCard from '@/components/ProductCard';
import CinematicIntro from '@/components/CinematicIntro';
import { jewelryProducts, toyProducts, bestSellers } from '@/data/products';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Index() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('radikae-intro-seen');
  });

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('radikae-intro-seen', 'true');
    setShowIntro(false);
  }, []);

  if (showIntro) {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="gold-shimmer">Radikae</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-serif italic tracking-wide">
              Toys for Smile, Jewels for Style
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Jewelry Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/jewelry" className="group block relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={heroJewelry} alt="Premium Jewelry Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-velvet-deep/90 via-velvet/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-primary" />
                    <span className="text-xs uppercase tracking-[0.2em] text-primary">Premium Collection</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-card-foreground dark:text-foreground mb-2">Jewelry</h2>
                  <p className="text-sm text-muted-foreground mb-3">Timeless elegance, crafted to perfection</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Toys Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/toys" className="group block relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={heroToys} alt="Fun Toys Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent dark:from-velvet-deep/90 dark:via-velvet/30" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Baby className="w-5 h-5 text-toy-pink dark:text-toy-pink" />
                    <span className="text-xs uppercase tracking-[0.2em] text-toy-pink">Joyful Play</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">Toys</h2>
                  <p className="text-sm text-muted-foreground mb-3">Safe, engaging, and full of wonder</p>
                  <span className="inline-flex items-center gap-1 text-sm text-toy-pink font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Curated for You</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl md:text-4xl font-bold">Best Sellers</motion.h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} variant={product.category === 'jewelry' ? 'jewelry' : 'toy'} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/best-sellers" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View All Best Sellers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Jewelry Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Premium Finish</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl md:text-4xl font-bold">Featured Jewelry</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-2">Crafted with detail, designed to inspire</motion.p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {jewelryProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} variant="jewelry" />
            ))}
          </div>
        </div>
      </section>

      {/* Toys Showcase */}
      <section className="py-16 toy-gradient">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-toy-pink" />
              <span className="text-xs uppercase tracking-[0.2em] text-toy-pink font-medium">Fun & Learning</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl md:text-4xl font-bold">Popular Toys</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mt-2">Joyful, safe, and endlessly engaging</motion.p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {toyProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} variant="toy" />
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">AI Powered</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl md:text-4xl font-bold">Recommended for You</motion.h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...jewelryProducts.slice(2, 4), ...toyProducts.slice(0, 2)].map(product => (
              <ProductCard key={product.id} product={product} variant={product.category === 'jewelry' ? 'jewelry' : 'toy'} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
