import { useState } from 'react';
import { careReminders, CareReminder } from '@/data/mock';
import { motion } from 'framer-motion';
import { Check, Clock, Droplets, Leaf } from 'lucide-react';

export default function CareReminders() {
  const [reminders, setReminders] = useState<CareReminder[]>(careReminders);

  const toggle = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  const pending = reminders.filter(r => !r.done);
  const completed = reminders.filter(r => r.done);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Care Reminders</h1>
        <p className="text-sm text-muted-foreground">Stay on top of your plant care schedule</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-accent" /> Pending ({pending.length})
        </h2>
        {pending.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
          >
            <button
              onClick={() => toggle(r.id)}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Check className="h-3 w-3 opacity-0 group-hover:opacity-100" />
            </button>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{r.task}</p>
              <p className="text-xs text-muted-foreground">{r.plantName} · Due {r.dueDate} · {r.frequency}</p>
            </div>
            <Droplets className="h-4 w-4 text-primary/40" />
          </motion.div>
        ))}
      </div>

      {completed.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Check className="h-4 w-4" /> Completed ({completed.length})
          </h2>
          {completed.map(r => (
            <div key={r.id} className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4 opacity-60">
              <button
                onClick={() => toggle(r.id)}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Check className="h-3 w-3" />
              </button>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground line-through">{r.task}</p>
                <p className="text-xs text-muted-foreground">{r.plantName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
