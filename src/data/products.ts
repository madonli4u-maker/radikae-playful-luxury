import { Product } from '@/contexts/CartContext';
import j1 from '@/assets/jewelry-1.jpg';
import j2 from '@/assets/jewelry-2.jpg';
import j3 from '@/assets/jewelry-3.jpg';
import t1 from '@/assets/toy-1.jpg';
import t2 from '@/assets/toy-2.jpg';
import t3 from '@/assets/toy-3.jpg';

export const jewelryProducts: Product[] = [
  { id: 'j1', name: 'Celestial Gold Pendant Necklace', price: 12999, originalPrice: 15999, image: j1, category: 'jewelry', subcategory: 'Necklaces', description: 'Timeless elegance in every detail. Hand-crafted gold pendant with celestial motif.', rating: 5, badge: 'Bestseller' },
  { id: 'j2', name: 'Rose Dawn Diamond Earrings', price: 8499, image: j2, category: 'jewelry', subcategory: 'Earrings', description: 'Crafted with precision, these rose gold diamond earrings radiate sophistication.', rating: 4 },
  { id: 'j3', name: 'Eternal Bloom Gold Bracelet', price: 15999, originalPrice: 19999, image: j3, category: 'jewelry', subcategory: 'Bracelets', description: 'A premium finish bracelet adorned with gemstones, symbolizing eternal beauty.', rating: 5, badge: 'New' },
  { id: 'j4', name: 'Maharani Kundan Choker Set', price: 24999, image: j1, category: 'jewelry', subcategory: 'Necklaces', description: 'Regal kundan craftsmanship meets modern luxury. A statement piece.', rating: 5 },
  { id: 'j5', name: 'Twilight Solitaire Ring', price: 6999, originalPrice: 8999, image: j2, category: 'jewelry', subcategory: 'Rings', description: 'A single brilliant stone set in rose gold. Understated luxury.', rating: 4, badge: '20% Off' },
  { id: 'j6', name: 'Heritage Gift Set — Trio', price: 29999, image: j3, category: 'jewelry', subcategory: 'Gift Sets', description: 'Necklace, earrings, and bracelet in a premium velvet box. The perfect gift.', rating: 5, badge: 'Gift Set' },
  { id: 'j7', name: 'Moonlit Pearl Drop Earrings', price: 4999, image: j2, category: 'jewelry', subcategory: 'Earrings', description: 'Freshwater pearls suspended in gold. Minimal elegance.', rating: 4 },
  { id: 'j8', name: 'Radiance Bangle — Rose Gold', price: 11499, originalPrice: 13999, image: j3, category: 'jewelry', subcategory: 'Bracelets', description: 'A smooth rose gold bangle with diamond accents.', rating: 5 },
];

export const toyProducts: Product[] = [
  { id: 't1', name: 'Cuddly Cloud Bear', price: 899, originalPrice: 1199, image: t1, category: 'toys', subcategory: 'Soft Toys', description: 'Super soft and huggable teddy bear, perfect for bedtime cuddles.', rating: 5, badge: 'Popular' },
  { id: 't2', name: 'Rainbow Builder Blocks (50pc)', price: 1499, image: t2, category: 'toys', subcategory: 'Educational Toys', description: 'Colorful wooden blocks to spark creativity and learning.', rating: 4 },
  { id: 't3', name: 'Turbo Racer RC Car', price: 2499, originalPrice: 2999, image: t3, category: 'toys', subcategory: 'RC Toys', description: 'High-speed remote control car with rechargeable battery.', rating: 4, badge: 'Sale' },
  { id: 't4', name: 'Musical Baby Rattle Set', price: 599, image: t1, category: 'toys', subcategory: 'Baby Toys', description: 'Safe, colorful rattles with gentle sounds for infants.', rating: 5 },
  { id: 't5', name: 'Alphabet Learning Puzzle', price: 799, image: t2, category: 'toys', subcategory: 'Educational Toys', description: 'Wooden alphabet puzzle board for early learning fun.', rating: 4 },
  { id: 't6', name: 'Adventure Play Tent', price: 1999, originalPrice: 2499, image: t3, category: 'toys', subcategory: 'Activity Toys', description: 'Pop-up indoor play tent for imaginative adventures.', rating: 5, badge: 'New' },
  { id: 't7', name: 'Dino Explorer Set', price: 1299, image: t1, category: 'toys', subcategory: 'Activity Toys', description: 'Dinosaur figurines with playmat and storybook.', rating: 4 },
  { id: 't8', name: 'Melody Piano Mat', price: 999, image: t2, category: 'toys', subcategory: 'Baby Toys', description: 'Step-on musical piano mat for toddlers. Colourful and engaging.', rating: 5 },
];

export const allProducts = [...jewelryProducts, ...toyProducts];
export const bestSellers = allProducts.filter(p => p.badge === 'Bestseller' || p.badge === 'Popular' || p.rating === 5);
export const offers = allProducts.filter(p => p.originalPrice);
