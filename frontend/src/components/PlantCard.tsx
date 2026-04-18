import { motion } from 'framer-motion';
import { Droplets, Sun, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { useCart } from '@/context/CartContext';

type PlantCardPlant = {
  id: number | string;
  name: string;
  scientific_name?: string;
  species?: string;
  price: number | string;
  image?: string;
  image_url?: string;
  careLevel?: 'Easy' | 'Medium' | 'Expert';
  category?: string;
  light?: string;
  light_requirements?: string;
  water?: string;
  water_frequency?: string;
  description: string;
};

const badgeColor = {
  Easy: 'bg-primary/15 text-primary',
  Medium: 'bg-accent/15 text-accent',
  Expert: 'bg-terracotta/15 text-terracotta',
  Tropical: 'bg-primary/15 text-primary',
  Indoor: 'bg-accent/15 text-accent',
  Succulent: 'bg-terracotta/15 text-terracotta',
  Flowering: 'bg-sunshine/20 text-sunshine',
};

const plantImages: Record<string, string> = {
  'Monstera Deliciosa': '/images/monstera.jpg',
  'Pothos Golden': '/images/pothos.jpg',
  'Snake Plant': '/images/snake-plant.jpg',
  'Fiddle Leaf Fig': '/images/fiddle-leaf.jpg',
  'ZZ Plant': '/images/zz-plant.jpg',
  'Philodendron Heart Leaf': '/images/philodendron-heart-leaf.jpg',
  'Rubber Plant': '/images/rubber-plant.jpg',
  'Spider Plant': '/images/spider-plant.jpg',
  'Alocasia': '/images/alocasia.jpg',
  'Orchid': '/images/orchid-plant.jpg',
  'Peace Lily': '/images/peace-lily.jpg',
};

export default function PlantCard({ plant, index = 0 }: { plant: PlantCardPlant; index?: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { addItem } = useCart();
  const badgeLabel = plant.category || plant.careLevel || 'Plant';
  const lightLabel = plant.light_requirements || plant.light || 'Varies';
  const waterLabel = plant.water_frequency || plant.water || 'Varies';
  const subtitle = plant.scientific_name || plant.species || 'Botanical collection';
  
  // Try to use local image first, fallback to plant data image
  const imageSource = plantImages[plant.name] || plant.image_url || plant.image || '/placeholder.jpg';
  const displayImage = imageFailed && (plant.image_url || plant.image) !== imageSource
    ? (plant.image_url || plant.image || '/placeholder.jpg')
    : imageSource;

  const handleAddToCart = () => {
    addItem({
      id: String(plant.id),
      name: plant.name,
      price: Number(plant.price),
      image_url: plant.image_url || plant.image,
    });

    toast.success(`${plant.name} added to cart`, {
      description: 'Open Orders to review your draft cart items.',
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-elevated"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={displayImage}
          alt={plant.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColor[badgeLabel] || 'bg-primary/15 text-primary'}`}>
            {badgeLabel}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">{plant.name}</h3>
            <p className="text-xs italic text-muted-foreground">{subtitle}</p>
          </div>
          <span className="font-display text-lg font-bold text-primary">${Number(plant.price).toFixed(2)}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{plant.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Sun className="h-3 w-3" />{lightLabel}</span>
          <span className="flex items-center gap-1"><Droplets className="h-3 w-3" />{waterLabel}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
