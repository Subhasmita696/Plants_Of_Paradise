import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '@/api/hooks/useApi';

const statusColors: Record<string, string> = {
  pending: 'bg-muted text-muted-foreground',
  confirmed: 'bg-blue-500/15 text-blue-500',
  shipped: 'bg-amber-500/15 text-amber-500',
  delivered: 'bg-green-500/15 text-green-500',
  cancelled: 'bg-red-500/15 text-red-500',
};

export default function Orders() {
  const { orders, loading, error, fetchAllOrders } = useOrders();

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground">Track and manage customer orders</p>
        </div>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          ⚠️ Error loading orders: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground">Track and manage customer orders</p>
        </div>
        <button
          onClick={fetchAllOrders}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
        >
          {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Order #</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Customer</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">Items</th>
              <th className="px-5 py-3 text-right font-medium text-muted-foreground">Total</th>
              <th className="px-5 py-3 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                  ⏳ Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-foreground">{order.order_number}</td>
                  <td className="px-5 py-4 text-foreground">{order.customer_name}</td>
                  <td className="px-5 py-4 text-muted-foreground text-xs">{order.customer_email}</td>
                  <td className="px-5 py-4 text-muted-foreground text-xs">
                    {order.total_amount ? `$${parseFloat(order.total_amount).toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-foreground">
                    ${parseFloat(order.total_amount || '0').toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[order.status] || statusColors.pending}`}>
                      {order.status}
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && orders.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">{orders.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Revenue</p>
            <p className="text-2xl font-bold text-foreground">
              ${orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-500">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-500">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
