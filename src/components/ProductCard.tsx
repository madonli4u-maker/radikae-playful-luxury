import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product, useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  product: Product;
  variant?: 'jewelry' | 'toy';
}

export default function ProductCard({ product, variant = 'toy' }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== 'jewelry') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setTilt({ x, y });
  };

  const isJewelry = variant === 'jewelry';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={isJewelry ? { transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` } : {}}
      className={`group relative overflow-hidden transition-all duration-300 ${
        isJewelry
          ? 'glass-card hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]'
          : 'bg-card rounded-2xl border border-border/50 hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold ${
          isJewelry ? 'bg-primary text-primary-foreground' : 'bg-toy-pink text-card-foreground'
        }`}>
          {product.badge}
        </span>
      )}

      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
      >
        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`} />
      </button>

      <div className={`aspect-square overflow-hidden ${isJewelry ? 'rounded-t-xl' : 'rounded-t-2xl'}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isJewelry && (
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{product.subcategory}</p>
        <h3 className={`font-semibold mb-2 line-clamp-1 ${isJewelry ? 'font-serif text-base' : 'text-sm'}`}>
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${isJewelry ? 'gold-text font-serif text-lg' : 'text-foreground'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className={`p-2 rounded-lg transition-colors ${
              isJewelry
                ? 'bg-primary/10 hover:bg-primary/20 text-primary'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
