import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Plus, Pencil, Trash2, Eye, EyeOff, Star, TrendingUp, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;

const subcategories = {
  jewelry: ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Gift Sets'],
  toys: ['Baby Toys', 'Educational Toys', 'Soft Toys', 'RC Toys', 'Activity Toys'],
};

const emptyProduct = {
  name: '', description: '', price: 0, original_price: null as number | null,
  category: 'jewelry' as string, subcategory: 'Necklaces', images: [] as string[],
  main_image_index: 0, badge: '', is_active: true, is_best_seller: false, is_offer: false,
};

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'dashboard' | 'products' | 'edit'>('dashboard');
  const [editProduct, setEditProduct] = useState(emptyProduct);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate('/admin/login');
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      name: editProduct.name,
      description: editProduct.description,
      price: editProduct.price,
      original_price: editProduct.original_price || null,
      category: editProduct.category,
      subcategory: editProduct.subcategory,
      images: editProduct.images,
      main_image_index: editProduct.main_image_index,
      badge: editProduct.badge || null,
      is_active: editProduct.is_active,
      is_best_seller: editProduct.is_best_seller,
      is_offer: editProduct.is_offer,
    };

    if (editId) {
      await supabase.from('products').update(payload).eq('id', editId);
    } else {
      await supabase.from('products').insert(payload);
    }
    await fetchProducts();
    setView('products');
    setEditId(null);
    setEditProduct(emptyProduct);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    await fetchProducts();
  };

  const startEdit = (p: Product) => {
    setEditProduct({
      name: p.name, description: p.description || '', price: p.price,
      original_price: p.original_price, category: p.category, subcategory: p.subcategory,
      images: p.images || [], main_image_index: p.main_image_index, badge: p.badge || '',
      is_active: p.is_active, is_best_seller: p.is_best_seller, is_offer: p.is_offer,
    });
    setEditId(p.id);
    setView('edit');
  };

  const addImage = () => {
    if (imageUrl.trim()) {
      setEditProduct(p => ({ ...p, images: [...p.images, imageUrl.trim()] }));
      setImageUrl('');
    }
  };

  const removeImage = (i: number) => {
    setEditProduct(p => ({
      ...p,
      images: p.images.filter((_, idx) => idx !== i),
      main_image_index: p.main_image_index >= i ? Math.max(0, p.main_image_index - 1) : p.main_image_index,
    }));
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden md:block w-56 shrink-0">
            <div className="bg-card rounded-xl border border-border/50 p-4 sticky top-20">
              <h3 className="font-serif font-bold text-sm mb-4 px-2">Admin Panel</h3>
              <nav className="space-y-1">
                {[
                  { label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' as const },
                  { label: 'Products', icon: Package, key: 'products' as const },
                ].map(link => (
                  <button
                    key={link.key}
                    onClick={() => { setView(link.key); setEditId(null); setEditProduct(emptyProduct); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      (view === link.key || (view === 'edit' && link.key === 'products'))
                        ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </button>
                ))}
                <button onClick={signOut} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Dashboard Overview */}
              {view === 'dashboard' && (
                <>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="bg-card rounded-xl border border-border/50 p-4">
                      <Package className="w-5 h-5 text-muted-foreground mb-2" />
                      <p className="text-2xl font-bold">{products.length}</p>
                      <p className="text-xs text-muted-foreground">Total Products</p>
                    </div>
                    <div className="bg-card rounded-xl border border-border/50 p-4">
                      <Star className="w-5 h-5 text-muted-foreground mb-2" />
                      <p className="text-2xl font-bold">{products.filter(p => p.is_best_seller).length}</p>
                      <p className="text-xs text-muted-foreground">Best Sellers</p>
                    </div>
                    <div className="bg-card rounded-xl border border-border/50 p-4">
                      <TrendingUp className="w-5 h-5 text-muted-foreground mb-2" />
                      <p className="text-2xl font-bold">{products.filter(p => p.is_offer).length}</p>
                      <p className="text-xs text-muted-foreground">Offers Active</p>
                    </div>
                  </div>
                </>
              )}

              {/* Product List */}
              {view === 'products' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="font-serif text-2xl font-bold">Products</h1>
                    <button
                      onClick={() => { setEditProduct(emptyProduct); setEditId(null); setView('edit'); }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110"
                    >
                      <Plus className="w-4 h-4" /> Add Product
                    </button>
                  </div>
                  <div className="space-y-3">
                    {products.map(p => (
                      <div key={p.id} className="bg-card rounded-xl border border-border/50 p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                          {p.images?.[p.main_image_index] ? (
                            <img src={p.images[p.main_image_index]} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No img</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                          <p className="text-xs text-muted-foreground">{p.category} • {p.subcategory} • ₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {p.is_active ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                          <button onClick={() => startEdit(p)} className="p-2 rounded-lg hover:bg-muted"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                    {products.length === 0 && <p className="text-center text-muted-foreground py-12">No products yet. Add your first product!</p>}
                  </div>
                </>
              )}

              {/* Edit / Add Product */}
              {view === 'edit' && (
                <>
                  <h1 className="font-serif text-2xl font-bold mb-6">{editId ? 'Edit Product' : 'Add Product'}</h1>
                  <div className="bg-card rounded-xl border border-border/50 p-6 space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Name *</label>
                        <input value={editProduct.name} onChange={e => setEditProduct(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Category *</label>
                        <select value={editProduct.category} onChange={e => setEditProduct(p => ({
                          ...p, category: e.target.value, subcategory: subcategories[e.target.value as keyof typeof subcategories]?.[0] || ''
                        }))} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                          <option value="jewelry">Jewellery</option>
                          <option value="toys">Kids / Toys</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Subcategory *</label>
                        <select value={editProduct.subcategory} onChange={e => setEditProduct(p => ({ ...p, subcategory: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                          {(subcategories[editProduct.category as keyof typeof subcategories] || []).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Badge</label>
                        <input value={editProduct.badge} onChange={e => setEditProduct(p => ({ ...p, badge: e.target.value }))}
                          placeholder="e.g. Bestseller, New, 20% Off"
                          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
                      <textarea value={editProduct.description} onChange={e => setEditProduct(p => ({ ...p, description: e.target.value }))}
                        rows={3} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Price (₹) *</label>
                        <input type="number" value={editProduct.price} onChange={e => setEditProduct(p => ({ ...p, price: Number(e.target.value) }))}
                          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Original Price (₹)</label>
                        <input type="number" value={editProduct.original_price || ''} onChange={e => setEditProduct(p => ({ ...p, original_price: e.target.value ? Number(e.target.value) : null }))}
                          placeholder="Leave empty if no discount"
                          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                    </div>

                    {/* Images */}
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Product Images</label>
                      <div className="flex gap-2 mb-3">
                        <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Paste image URL..."
                          className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        <button onClick={addImage} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Add</button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {editProduct.images.map((img, i) => (
                          <div key={i} className={`relative aspect-square rounded-lg overflow-hidden border-2 ${i === editProduct.main_image_index ? 'border-primary' : 'border-border'}`}>
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                              <button onClick={() => setEditProduct(p => ({ ...p, main_image_index: i }))} className="p-1 bg-primary text-primary-foreground rounded text-[10px]">Main</button>
                              <button onClick={() => removeImage(i)} className="p-1 bg-destructive text-destructive-foreground rounded text-[10px]">×</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex flex-wrap gap-4">
                      {[
                        { key: 'is_active', label: 'Active' },
                        { key: 'is_best_seller', label: 'Best Seller' },
                        { key: 'is_offer', label: 'Offer' },
                      ].map(toggle => (
                        <label key={toggle.key} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" checked={(editProduct as any)[toggle.key]}
                            onChange={e => setEditProduct(p => ({ ...p, [toggle.key]: e.target.checked }))}
                            className="rounded border-border accent-primary" />
                          {toggle.label}
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button onClick={handleSave} disabled={saving || !editProduct.name || !editProduct.price}
                        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 disabled:opacity-50">
                        {saving ? 'Saving...' : editId ? 'Update Product' : 'Create Product'}
                      </button>
                      <button onClick={() => { setView('products'); setEditId(null); setEditProduct(emptyProduct); }}
                        className="px-6 py-2.5 rounded-xl border border-border text-sm hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
