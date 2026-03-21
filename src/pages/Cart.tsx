import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, wishlist, addToCart } = useCart();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif text-3xl md:text-4xl font-bold mb-8">
          Shopping Cart
        </motion.h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/" className="text-primary hover:underline text-sm font-medium">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border/50"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.subcategory}</p>
                    <p className="font-bold text-primary mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 bg-muted rounded-lg px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-card rounded-xl border border-border/50 p-6 h-fit sticky top-20">
              <h3 className="font-serif text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary">Free</span></div>
              </div>
              <div className="border-t border-border pt-3 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="gold-text">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}

        {/* Wishlist */}
        {wishlist.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Your Wishlist</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wishlist.map(item => (
                <div key={item.id} className="bg-card rounded-xl border border-border/50 p-3">
                  <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
                  <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                  <p className="text-primary font-bold text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 w-full py-1.5 text-xs bg-muted rounded-lg hover:bg-muted/80 transition-colors font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
