import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import PlantCard from '@/components/PlantCard';
import { motion } from 'framer-motion';
import { useCatalog } from '@/api/hooks/useApi';

const CATEGORIES = ['All', 'Tropical', 'Indoor', 'Succulent', 'Flowering'];

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const { plants, loading, error, fetchAllPlants, fetchPlantsByCategory } = useCatalog();

  useEffect(() => {
    if (filter === 'All') {
      fetchAllPlants();
    } else {
      fetchPlantsByCategory(filter);
    }
  }, [filter, fetchAllPlants, fetchPlantsByCategory]);

  const filtered = plants.filter(p => {
    const matchSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      (p.scientific_name && p.scientific_name.toLowerCase().includes(search.toLowerCase()));
    return matchSearch;
  });

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Plant Catalog</h1>
          <p className="text-sm text-muted-foreground">Browse and manage your plant inventory</p>
        </div>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          ⚠️ Error loading plants: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Plant Catalog</h1>
        <p className="text-sm text-muted-foreground">Browse and manage your plant inventory</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search plants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-72"
          />
        </div>
        <div className="flex gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                filter === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 animate-pulse">
              <div className="h-40 bg-muted rounded-lg mb-3" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No plants found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((plant, i) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <PlantCard plant={plant} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
