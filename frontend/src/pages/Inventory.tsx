import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useInventory } from '@/api/hooks/useApi';

export default function Inventory() {
  const { inventory, loading, error, fetchAllInventory, fetchLowStockItems } = useInventory();
  
  useEffect(() => {
    fetchAllInventory();
  }, [fetchAllInventory]);

  const sorted = [...inventory].sort((a, b) => a.quantity_in_stock - b.quantity_in_stock);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground">Monitor stock levels across all plants</p>
        </div>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          ⚠️ Error loading inventory: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground">Monitor stock levels across all plants</p>
        </div>
        <button
          onClick={fetchAllInventory}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
        >
          {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-4" />
              <div className="h-8 bg-muted rounded w-1/2 mb-4" />
              <div className="h-2 bg-muted rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((item, i) => {
            const low = item.quantity_in_stock <= item.reorder_level;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border bg-card p-5 shadow-card ${low ? 'border-destructive/40' : 'border-border'}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">Stock #{item.id}</p>
                  </div>
                  {low && <AlertTriangle className="h-4 w-4 text-destructive" />}
                </div>
                <div className="mt-4">
                  <div className="flex items-end justify-between">
                    <span className="font-display text-2xl font-bold text-foreground">{item.quantity_in_stock}</span>
                    <span className="text-xs text-muted-foreground">units</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full transition-all ${low ? 'bg-destructive' : 'bg-primary'}`}
                      style={{ width: `${Math.min(100, (item.quantity_in_stock / item.reorder_level) * 100)}%` }}
                    />
                  </div>
                  {low && (
                    <p className="mt-2 text-xs font-medium text-destructive">
                      Low stock — Reorder level: {item.reorder_level}
                    </p>
                  )}
                  {item.supplier && (
                    <p className="mt-2 text-xs text-muted-foreground">Supplier: {item.supplier}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
