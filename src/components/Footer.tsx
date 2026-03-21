import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold gold-shimmer mb-3">Radikae</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Toys for Smile, Jewels for Style. A premium marketplace blending joyful play with timeless elegance.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-semibold mb-3 text-foreground">Shop</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/toys" className="hover:text-primary transition-colors">Toys</Link>
              <Link to="/jewelry" className="hover:text-primary transition-colors">Jewelry</Link>
              <Link to="/best-sellers" className="hover:text-primary transition-colors">Best Sellers</Link>
              <Link to="/offers" className="hover:text-primary transition-colors">Offers</Link>
            </div>
          </div>
          <div>
            <h4 className="font-serif font-semibold mb-3 text-foreground">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/seller" className="hover:text-primary transition-colors">Seller Profile</Link>
              <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
              <span>About Us</span>
              <span>Contact</span>
            </div>
          </div>
          <div>
            <h4 className="font-serif font-semibold mb-3 text-foreground">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>FAQ</span>
              <span>Shipping Policy</span>
              <span>Returns & Exchange</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          © 2026 Radikae. All rights reserved. Prices in ₹ (INR).
        </div>
      </div>
    </footer>
  );
}
