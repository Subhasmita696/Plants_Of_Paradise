import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Droplets } from 'lucide-react';
import { useCareReminders } from '@/api/hooks/useApi';

export default function CareReminders() {
  const { reminders, loading, error, fetchUpcomingReminders, completeReminder } = useCareReminders();

  useEffect(() => {
    fetchUpcomingReminders();
  }, [fetchUpcomingReminders]);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Care Reminders</h1>
          <p className="text-sm text-muted-foreground">Stay on top of your plant care schedule</p>
        </div>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          ⚠️ Error loading reminders: {error}
        </div>
      </div>
    );
  }

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'watering':
        return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'fertilizing':
        return <span className="text-lg">🧪</span>;
      case 'pruning':
        return <span className="text-lg">✂️</span>;
      case 'repotting':
        return <span className="text-lg">🪴</span>;
      case 'inspection':
        return <span className="text-lg">🔍</span>;
      default:
        return <Droplets className="h-4 w-4" />;
    }
  };

  const reminderTypeLabels: Record<string, string> = {
    watering: 'Watering',
    fertilizing: 'Fertilizing',
    pruning: 'Pruning',
    repotting: 'Repotting',
    inspection: 'Inspection',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Care Reminders</h1>
          <p className="text-sm text-muted-foreground">Stay on top of your plant care schedule</p>
        </div>
        <button
          onClick={fetchUpcomingReminders}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
        >
          {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-accent" /> Upcoming Reminders ({reminders.length})
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 animate-pulse">
                <div className="h-6 w-6 rounded-full bg-muted" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
                <div className="h-4 w-4 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : reminders.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-muted-foreground">No upcoming reminders in the next 7 days</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder, i) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-md transition"
              >
                <button
                  onClick={() => completeReminder(reminder.id)}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary transition hover:bg-primary hover:text-primary-foreground"
                  title="Mark as completed"
                >
                  <Check className="h-3 w-3" />
                </button>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{reminder.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {reminderTypeLabels[reminder.reminder_type]} • Due {reminder.next_due_date} • {reminder.frequency}
                  </p>
                  {reminder.description && (
                    <p className="text-xs text-muted-foreground mt-1 italic">{reminder.description}</p>
                  )}
                </div>
                {getReminderIcon(reminder.reminder_type)}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {!loading && reminders.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Reminders</p>
            <p className="text-2xl font-bold text-foreground">{reminders.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Watering</p>
            <p className="text-2xl font-bold text-blue-500">
              {reminders.filter(r => r.reminder_type === 'watering').length}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Other Tasks</p>
            <p className="text-2xl font-bold text-green-500">
              {reminders.filter(r => r.reminder_type !== 'watering').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
