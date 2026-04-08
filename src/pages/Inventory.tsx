import { plants } from '@/data/mock';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function Inventory() {
  const sorted = [...plants].sort((a, b) => a.stock - b.stock);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Inventory</h1>
        <p className="text-sm text-muted-foreground">Monitor stock levels across all plants</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((plant, i) => {
          const low = plant.stock < 15;
          return (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border bg-card p-5 shadow-card ${low ? 'border-destructive/40' : 'border-border'}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">{plant.name}</h3>
                  <p className="text-xs text-muted-foreground italic">{plant.species}</p>
                </div>
                {low && <AlertTriangle className="h-4 w-4 text-destructive" />}
              </div>
              <div className="mt-4">
                <div className="flex items-end justify-between">
                  <span className="font-display text-2xl font-bold text-foreground">{plant.stock}</span>
                  <span className="text-xs text-muted-foreground">units</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full transition-all ${low ? 'bg-destructive' : 'bg-primary'}`}
                    style={{ width: `${Math.min(100, (plant.stock / 100) * 100)}%` }}
                  />
                </div>
                {low && <p className="mt-2 text-xs font-medium text-destructive">Low stock — reorder soon</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
