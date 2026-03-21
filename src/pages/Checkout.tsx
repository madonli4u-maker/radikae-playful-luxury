import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Building, Smartphone, Lock, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>('upi');
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold mb-2">Order Placed!</h1>
          <p className="text-muted-foreground mb-6">Thank you for shopping with Radikae</p>
          <Link to="/" className="text-primary hover:underline font-medium">Continue Shopping</Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No items in cart</p>
          <Link to="/" className="text-primary hover:underline">Go Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif text-3xl md:text-4xl font-bold mb-8">
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="font-serif text-lg font-bold mb-4">Shipping Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Full Name" className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Phone Number" className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Email" className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 md:col-span-2" />
                <textarea placeholder="Shipping Address" rows={3} className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 md:col-span-2 resize-none" />
                <input placeholder="City" className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="PIN Code" className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="font-serif text-lg font-bold mb-4">Payment Method</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'upi' as const, label: 'UPI', icon: Smartphone },
                  { id: 'card' as const, label: 'Card', icon: CreditCard },
                  { id: 'netbanking' as const, label: 'Net Banking', icon: Building },
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-all ${
                        payment === m.id ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {m.label}
                    </button>
                  );
                })}
              </div>

              {payment === 'upi' && (
                <input placeholder="UPI ID (e.g. name@upi)" className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              )}
              {payment === 'card' && (
                <div className="space-y-3">
                  <input placeholder="Card Number" className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/YY" className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <input placeholder="CVV" className="px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
              )}
              {payment === 'netbanking' && (
                <select className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>Select Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank</option>
                </select>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl border border-border/50 p-6 h-fit sticky top-20">
            <h3 className="font-serif text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-2">{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="gold-text">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button
              onClick={() => { clearCart(); setPlaced(true); }}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Place Order
            </button>
            <p className="text-xs text-muted-foreground text-center mt-3">Secure checkout • All prices in ₹ (INR)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
