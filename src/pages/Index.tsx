import { motion } from 'framer-motion';
import { Leaf, ShoppingCart, Package, Bell, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/StatCard';
import { plants, orders, careReminders } from '@/data/mock';
import heroImage from '@/assets/hero-plants.jpg';

const todayReminders = careReminders.filter(r => !r.done && r.dueDate === '2026-04-08');

export default function Index() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <img src={heroImage} alt="Lush greenhouse plants" width={1920} height={1080} className="h-64 w-full object-cover lg:h-80" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
          <h1 className="font-display text-3xl font-bold text-primary-foreground lg:text-4xl">
            Plant of Paradise
          </h1>
          <p className="mt-1 max-w-lg text-sm text-primary-foreground/80 font-body">
            Microservices dashboard for managing your botanical operations — catalog, orders, inventory & care.
          </p>
          <div className="mt-4 flex gap-3">
            <Link to="/catalog" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
              <Leaf className="h-4 w-4" /> Browse Catalog
            </Link>
            <Link to="/orders" className="inline-flex items-center gap-2 rounded-lg bg-card/90 backdrop-blur px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-card">
              View Orders <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Leaf} title="Total Plants" value={plants.length} subtitle="In catalog" trend={{ value: '+3 this week', positive: true }} delay={0.1} />
        <StatCard icon={ShoppingCart} title="Active Orders" value={orders.filter(o => o.status !== 'Delivered').length} subtitle="Processing & Shipped" delay={0.15} />
        <StatCard icon={Package} title="Total Stock" value={plants.reduce((a, p) => a + p.stock, 0)} subtitle="Units across all plants" trend={{ value: '+12%', positive: true }} delay={0.2} />
        <StatCard icon={Bell} title="Due Today" value={todayReminders.length} subtitle="Care reminders" delay={0.25} />
      </div>

      {/* Quick sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
            <Link to="/orders" className="text-xs font-medium text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 4).map(order => (
              <div key={order.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.customer} · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">${order.total}</p>
                  <span className={`text-xs font-medium ${
                    order.status === 'Delivered' ? 'text-primary' :
                    order.status === 'Shipped' ? 'text-accent' :
                    order.status === 'Processing' ? 'text-sunshine' : 'text-muted-foreground'
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's reminders */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Today's Care Tasks</h2>
            <Link to="/care" className="text-xs font-medium text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {todayReminders.length === 0 && <p className="text-sm text-muted-foreground">All caught up! 🌿</p>}
            {todayReminders.map(r => (
              <div key={r.id} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
                <Bell className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">{r.task}</p>
                  <p className="text-xs text-muted-foreground">{r.plantName} · {r.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Services status */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Microservices Status</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { name: 'API Gateway', status: 'Online' },
            { name: 'Identity', status: 'Online' },
            { name: 'Plant Catalog', status: 'Online' },
            { name: 'Orders', status: 'Online' },
            { name: 'Inventory', status: 'Online' },
            { name: 'Care Reminders', status: 'Online' },
          ].map(svc => (
            <div key={svc.name} className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <div className="mx-auto mb-2 h-2 w-2 rounded-full bg-primary" />
              <p className="text-xs font-medium text-foreground">{svc.name}</p>
              <p className="text-xs text-primary">{svc.status}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
