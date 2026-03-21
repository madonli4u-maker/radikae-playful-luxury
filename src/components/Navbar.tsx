import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/toys', label: 'Toys' },
  { to: '/jewelry', label: 'Jewelry' },
  { to: '/best-sellers', label: 'Best Sellers' },
  { to: '/offers', label: 'Offers' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, wishlist } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold gold-shimmer tracking-wide">Radikae</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? 'text-primary' : 'text-foreground/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-foreground/70" />}
          </button>
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Heart className="w-5 h-5 text-foreground/70" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary text-secondary-foreground text-[10px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground/70" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="flex flex-col p-4 gap-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  location.pathname === link.to ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
