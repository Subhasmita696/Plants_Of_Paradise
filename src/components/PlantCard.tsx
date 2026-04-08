import { motion } from 'framer-motion';
import { Plant } from '@/data/mock';
import { Droplets, Sun, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const careLevelColor = {
  Easy: 'bg-primary/15 text-primary',
  Medium: 'bg-accent/15 text-accent',
  Expert: 'bg-terracotta/15 text-terracotta',
};

export default function PlantCard({ plant, index }: { plant: Plant; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-elevated"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${careLevelColor[plant.careLevel]}`}>
            {plant.careLevel}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">{plant.name}</h3>
            <p className="text-xs italic text-muted-foreground">{plant.species}</p>
          </div>
          <span className="font-display text-lg font-bold text-primary">${plant.price}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{plant.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Sun className="h-3 w-3" />{plant.light}</span>
          <span className="flex items-center gap-1"><Droplets className="h-3 w-3" />{plant.water}</span>
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
