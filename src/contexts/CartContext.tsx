import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'toys' | 'jewelry';
  subcategory: string;
  description: string;
  rating: number;
  originalPrice?: number;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('radikae-cart') || '[]'); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem('radikae-wishlist') || '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('radikae-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('radikae-wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev =>
      prev.find(i => i.id === product.id) ? prev.filter(i => i.id !== product.id) : [...prev, product]
    );
  };

  const isInWishlist = (id: string) => wishlist.some(i => i.id === id);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, isInWishlist, cartTotal, cartCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
