import type { Order } from '../types';
import { parseISO, format, isWeekend, getHours } from 'date-fns';

export function filterOrdersByMonth(orders: Order[], monthStr: string): Order[] {
  return orders.filter(o => {
    const d = parseISO(o.orderDate);
    return format(d, 'MMMM yyyy') === monthStr;
  });
}

export function getTotalSpend(orders: Order[]): number {
  return orders.reduce((sum, o) => sum + o.total, 0);
}

export function getTotalOrders(orders: Order[]): number {
  return orders.length;
}

export function getTotalCalories(orders: Order[]): number {
  return orders.reduce((sum, o) => sum + o.estimatedCalories, 0);
}

export function getAverageOrderValue(orders: Order[]): number {
  if (orders.length === 0) return 0;
  return getTotalSpend(orders) / orders.length;
}

export function getMonthlySpend(orders: Order[]) {
  const map: Record<string, { month: string, spend: number, orders: number }> = {};
  orders.forEach(o => {
    const month = format(parseISO(o.orderDate), 'MMM yyyy');
    if (!map[month]) map[month] = { month, spend: 0, orders: 0 };
    map[month].spend += o.total;
    map[month].orders += 1;
  });
  // Sort by date could be needed, but assuming dataset is ordered or we sort by parsing back
  return Object.values(map).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

export function getMonthlyOrders(orders: Order[]) {
  // Essentially the same data structure as getMonthlySpend, just picking orders
  return getMonthlySpend(orders).map(d => ({ month: d.month, orders: d.orders }));
}

export function getCalorieTrend(orders: Order[]) {
  const map: Record<string, { month: string, calories: number }> = {};
  orders.forEach(o => {
    const month = format(parseISO(o.orderDate), 'MMM yyyy');
    if (!map[month]) map[month] = { month, calories: 0 };
    map[month].calories += o.estimatedCalories;
  });
  return Object.values(map).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

export function getPlatformBreakdown(orders: Order[]) {
  const totalSpend = getTotalSpend(orders);
  const totalOrders = getTotalOrders(orders);
  if (totalOrders === 0) return [];

  const map: Record<string, { platform: string, orders: number, spend: number }> = {};
  orders.forEach(o => {
    if (!map[o.platform]) map[o.platform] = { platform: o.platform, orders: 0, spend: 0 };
    map[o.platform].orders += 1;
    map[o.platform].spend += o.total;
  });

  return Object.values(map).map(p => ({
    ...p,
    orderPercentage: (p.orders / totalOrders) * 100,
    spendPercentage: (p.spend / totalSpend) * 100
  })).sort((a, b) => b.spend - a.spend);
}

export function getTopRestaurants(orders: Order[]) {
  const map: Record<string, { restaurant: string, orders: number, spend: number }> = {};
  orders.forEach(o => {
    if (!map[o.restaurant]) map[o.restaurant] = { restaurant: o.restaurant, orders: 0, spend: 0 };
    map[o.restaurant].orders += 1;
    map[o.restaurant].spend += o.total;
  });
  return Object.values(map)
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 5)
    .map((r, i) => ({ rank: i + 1, ...r }));
}

export function getCategoryBreakdown(orders: Order[]) {
  const map: Record<string, { category: string, orders: number, spend: number, calories: number }> = {};
  orders.forEach(o => {
    // A single order can have multiple items and categories. We need to aggregate by item category.
    // For spend, we proportionally attribute order total to items or just count occurrences.
    // The prompt: "Show order count, spending, estimated calories".
    // Let's divide order spend equally among its items for simplicity of category spending.
    const itemsCount = o.items.length;
    o.items.forEach(item => {
      if (!map[item.category]) map[item.category] = { category: item.category, orders: 0, spend: 0, calories: 0 };
      map[item.category].orders += item.quantity;
      map[item.category].spend += (o.total / itemsCount); 
      map[item.category].calories += item.estimatedCalories;
    });
  });
  return Object.values(map).sort((a, b) => b.spend - a.spend);
}

export function getWeekdayWeekendAnalysis(orders: Order[]) {
  const weekData = { orders: 0, spend: 0 };
  const weekendData = { orders: 0, spend: 0 };

  orders.forEach(o => {
    const d = parseISO(o.orderDate);
    if (isWeekend(d)) {
      weekendData.orders += 1;
      weekendData.spend += o.total;
    } else {
      weekData.orders += 1;
      weekData.spend += o.total;
    }
  });

  return [
    { type: 'Weekdays', ...weekData, averageOrderValue: weekData.orders ? weekData.spend / weekData.orders : 0 },
    { type: 'Weekends', ...weekendData, averageOrderValue: weekendData.orders ? weekendData.spend / weekendData.orders : 0 }
  ];
}

export function getOrderTiming(orders: Order[]) {
  const periods = {
    Morning: { period: 'Morning (06:00-10:59)', orders: 0, spend: 0 },
    Afternoon: { period: 'Afternoon (11:00-16:59)', orders: 0, spend: 0 },
    Evening: { period: 'Evening (17:00-20:59)', orders: 0, spend: 0 },
    LateNight: { period: 'Late Night (21:00-05:59)', orders: 0, spend: 0 }
  };

  orders.forEach(o => {
    const d = parseISO(`${o.orderDate}T${o.orderTime}`);
    const h = getHours(d);
    if (h >= 6 && h < 11) {
      periods.Morning.orders += 1;
      periods.Morning.spend += o.total;
    } else if (h >= 11 && h < 17) {
      periods.Afternoon.orders += 1;
      periods.Afternoon.spend += o.total;
    } else if (h >= 17 && h < 21) {
      periods.Evening.orders += 1;
      periods.Evening.spend += o.total;
    } else {
      periods.LateNight.orders += 1;
      periods.LateNight.spend += o.total;
    }
  });

  const total = getTotalOrders(orders);
  return Object.values(periods).map(p => ({
    ...p,
    percentage: total > 0 ? (p.orders / total) * 100 : 0
  })).sort((a, b) => b.orders - a.orders); // sort by order count descending
}

export function getRecentOrders(orders: Order[], limit = 10) {
  // Sort descending by date/time
  return [...orders].sort((a, b) => {
    const d1 = new Date(`${a.orderDate}T${a.orderTime}`).getTime();
    const d2 = new Date(`${b.orderDate}T${b.orderTime}`).getTime();
    return d2 - d1;
  }).slice(0, limit);
}

export function getNutritionSummary(orders: Order[]) {
  return {
    totalCalories: orders.reduce((s, o) => s + o.estimatedCalories, 0),
    totalProtein: orders.reduce((s, o) => s + o.estimatedProtein, 0),
    totalCarbs: orders.reduce((s, o) => s + o.estimatedCarbs, 0),
    totalFat: orders.reduce((s, o) => s + o.estimatedFat, 0)
  };
}
