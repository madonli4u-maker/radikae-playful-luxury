import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, ChevronLeft, Minus, Plus, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = allProducts.find(p => p.id === id);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found.</p>
          <button onClick={() => navigate(-1)} className="text-primary hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const isJewelry = product.category === 'jewelry';
  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const similarBySubcategory = allProducts.filter(p => p.subcategory === product.subcategory && p.id !== product.id).slice(0, 4);

  // Mock gallery: use same image repeated (in real app these would be different angles)
  const galleryImages = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };

  const bgStyle = isJewelry
    ? { background: 'linear-gradient(180deg, hsl(340 60% 6%) 0%, hsl(340 55% 9%) 50%, hsl(340 50% 7%) 100%)' }
    : {};

  return (
    <div className="min-h-screen bg-background" style={bgStyle}>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm mb-6"
        >
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-muted-foreground">/</span>
          <Link to={isJewelry ? '/jewelry' : '/toys'} className={`hover:underline ${isJewelry ? 'text-primary' : 'text-toy-pink'}`}>
            {isJewelry ? 'Jewellery' : 'Toys'}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground truncate max-w-[200px]">{product.name}</span>
        </motion.div>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`relative aspect-square overflow-hidden mb-4 ${isJewelry ? 'rounded-xl' : 'rounded-2xl'}`}>
              <img
                src={galleryImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  isJewelry ? 'bg-primary text-primary-foreground' : 'bg-toy-pink text-white'
                }`}>
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === i
                      ? isJewelry ? 'border-primary' : 'border-toy-pink'
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${isJewelry ? 'text-secondary' : 'text-toy-pink'}`}>
              {product.subcategory}
            </p>
            <h1 className={`font-serif font-bold mb-4 ${isJewelry ? 'text-3xl md:text-4xl gold-shimmer inline-block' : 'text-2xl md:text-3xl text-foreground'}`}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating}.0) • 24 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className={`text-3xl font-bold ${isJewelry ? 'gold-text font-serif' : 'text-foreground'}`}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-sm font-semibold ${isJewelry ? 'text-secondary' : 'text-toy-pink'}`}>
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <p className={`text-sm leading-relaxed mb-6 ${isJewelry ? 'text-secondary' : 'text-muted-foreground'}`}>
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-muted-foreground">Quantity</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  isJewelry
                    ? 'bg-primary text-primary-foreground hover:brightness-110'
                    : 'bg-toy-pink text-white hover:brightness-110'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isInWishlist(product.id)
                    ? isJewelry ? 'border-primary bg-primary/10' : 'border-toy-pink bg-toy-pink/10'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? (isJewelry ? 'fill-primary text-primary' : 'fill-toy-pink text-toy-pink') : 'text-muted-foreground'}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="space-y-3 pt-6 border-t border-border/50">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'On orders above ₹499' },
                { icon: ShieldCheck, label: 'Authentic & Certified', sub: isJewelry ? 'BIS Hallmarked' : 'Safety Certified' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '7-day return policy' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-3">
                  <b.icon className={`w-4 h-4 flex-shrink-0 ${isJewelry ? 'text-primary' : 'text-toy-mint'}`} />
                  <div>
                    <span className="text-xs font-semibold">{b.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">{b.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        {similarBySubcategory.length > 0 && (
          <section className="mt-16 pb-4">
            <h2 className={`font-serif text-xl md:text-2xl font-bold mb-6 ${isJewelry ? 'gold-shimmer inline-block' : 'text-foreground'}`}>
              Similar Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {similarBySubcategory.map(p => (
                <ProductCard key={p.id} product={p} variant={isJewelry ? 'jewelry' : 'toy'} />
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-12 pb-12">
            <h2 className={`font-serif text-xl md:text-2xl font-bold mb-6 ${isJewelry ? 'gold-shimmer inline-block' : 'text-foreground'}`}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map(p => (
                <ProductCard key={p.id} product={p} variant={isJewelry ? 'jewelry' : 'toy'} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
