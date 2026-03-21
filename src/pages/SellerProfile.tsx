import { motion } from 'framer-motion';
import { Store, Star, Package, MapPin } from 'lucide-react';

export default function SellerProfile() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border border-border/50 p-8 text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Store className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-2">Radikae Official Store</h1>
            <p className="text-muted-foreground mb-4">Premium marketplace for toys and jewelry</p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary" /> 4.9 Rating</span>
              <span className="flex items-center gap-1"><Package className="w-4 h-4" /> 500+ Products</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> India</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="font-serif font-bold mb-3">About the Seller</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Radikae Official Store brings you carefully curated collections of premium jewelry and delightful toys.
                Every product is quality-checked and comes with our satisfaction guarantee.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="font-serif font-bold mb-3">Seller Policies</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Free shipping on orders above ₹999</li>
                <li>• 7-day easy returns</li>
                <li>• Genuine quality guarantee</li>
                <li>• Secure packaging</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
