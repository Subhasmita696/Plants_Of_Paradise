import { useState } from 'react';
import { Search } from 'lucide-react';
import { plants } from '@/data/mock';
import PlantCard from '@/components/PlantCard';
import { motion } from 'framer-motion';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const filtered = plants.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.species.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.careLevel === filter;
    return matchSearch && matchFilter;
  });

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
          {['All', 'Easy', 'Medium', 'Expert'].map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                filter === level
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((plant, i) => (
          <PlantCard key={plant.id} plant={plant} index={i} />
        ))}
      </div>
      {filtered.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-muted-foreground">
          No plants match your search.
        </motion.p>
      )}
    </div>
  );
}
