import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Users, TrendingUp, ShoppingCart, Settings } from 'lucide-react';

const stats = [
  { label: 'Total Orders', value: '1,247', icon: ShoppingCart, change: '+12%' },
  { label: 'Total Revenue', value: '₹18.5L', icon: TrendingUp, change: '+8%' },
  { label: 'Products', value: '342', icon: Package, change: '+5' },
  { label: 'Customers', value: '3,891', icon: Users, change: '+23%' },
];

const sideLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Products', icon: Package },
  { label: 'Orders', icon: ShoppingCart },
  { label: 'Customers', icon: Users },
  { label: 'Analytics', icon: TrendingUp },
  { label: 'Settings', icon: Settings },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden md:block w-56 shrink-0">
            <div className="bg-card rounded-xl border border-border/50 p-4 sticky top-20">
              <h3 className="font-serif font-bold text-sm mb-4 px-2">Admin Panel</h3>
              <nav className="space-y-1">
                {sideLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.label}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        link.active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-serif text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-card rounded-xl border border-border/50 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xs text-primary font-medium">{stat.change}</span>
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <h3 className="font-serif font-bold mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {['#1247 — Gold Pendant Necklace', '#1246 — Cuddly Cloud Bear', '#1245 — Diamond Earrings Set'].map(order => (
                      <div key={order} className="flex justify-between items-center text-sm py-2 border-b border-border/30 last:border-0">
                        <span>{order}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Processing</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <h3 className="font-serif font-bold mb-4">Top Categories</h3>
                  <div className="space-y-3">
                    {[{ name: 'Necklaces', pct: 35 }, { name: 'Soft Toys', pct: 28 }, { name: 'Earrings', pct: 20 }, { name: 'RC Toys', pct: 17 }].map(cat => (
                      <div key={cat.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cat.name}</span><span className="text-muted-foreground">{cat.pct}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${cat.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
