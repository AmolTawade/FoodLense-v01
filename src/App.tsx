import { useState, useMemo } from 'react';
import datasetRaw from './data/foodlens_sample_orders_12_months.json';
import type { Order, Dataset } from './types';
import Dashboard from './components/Dashboard';

function App() {
  const data = datasetRaw as unknown as Dataset;
  const orders: Order[] = data.orders;

  // Compute available months from data, defaulting to August 2026
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    orders.forEach(o => {
      const d = new Date(o.orderDate);
      const monthStr = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      months.add(monthStr);
    });
    // Sort descending (simplistic sort since it's just MMM YYYY)
    return Array.from(months).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [orders]);

  const [selectedMonth, setSelectedMonth] = useState<string>('August 2026');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-purple-500/30">
      <Dashboard 
        orders={orders} 
        availableMonths={availableMonths}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
    </div>
  );
}

export default App;
