import { orders } from '@/data/mock';
import { motion } from 'framer-motion';

const statusBadge: Record<string, string> = {
  Pending: 'bg-muted text-muted-foreground',
  Processing: 'bg-sunshine/15 text-sunshine',
  Shipped: 'bg-accent/15 text-accent',
  Delivered: 'bg-primary/15 text-primary',
};

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground">Track and manage customer orders</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Order ID</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Customer</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Date</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Items</th>
              <th className="px-5 py-3 text-right font-medium text-muted-foreground">Total</th>
              <th className="px-5 py-3 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-5 py-4 font-medium text-foreground">{order.id}</td>
                <td className="px-5 py-4 text-foreground">{order.customer}</td>
                <td className="px-5 py-4 text-muted-foreground">{order.date}</td>
                <td className="px-5 py-4 text-muted-foreground">
                  {order.items.map(it => `${it.plantName} ×${it.qty}`).join(', ')}
                </td>
                <td className="px-5 py-4 text-right font-semibold text-foreground">${order.total}</td>
                <td className="px-5 py-4 text-center">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusBadge[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
