import { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Wallet, ShoppingBag, Flame, TrendingUp, Sparkles, 
  Clock, CalendarDays, Utensils, Smartphone, ChevronDown, CheckCircle2
} from 'lucide-react';
import type { Order } from '../types';
import KPICard from './KPICard';
import { 
  filterOrdersByMonth, getTotalSpend, getTotalOrders, getTotalCalories, 
  getAverageOrderValue, getMonthlySpend, getPlatformBreakdown, 
  getTopRestaurants, getCategoryBreakdown, getWeekdayWeekendAnalysis, 
  getCalorieTrend, getOrderTiming, getRecentOrders, getNutritionSummary 
} from '../services/analyticsService';
import { getInsights } from '../services/insightService';

const COLORS = ['#8b5cf6', '#c084fc', '#e879f9', '#f472b6', '#fb7185'];
const PLATFORM_COLORS = { 'Zomato': '#ef4444', 'Swiggy': '#f97316', 'Other': '#8b5cf6' };

interface DashboardProps {
  orders: Order[];
  availableMonths: string[];
  selectedMonth: string;
  onMonthChange: (m: string) => void;
}

export default function Dashboard({ orders, availableMonths, selectedMonth, onMonthChange }: DashboardProps) {
  // Current month data
  const currentOrders = useMemo(() => filterOrdersByMonth(orders, selectedMonth), [orders, selectedMonth]);
  
  // Previous month data for trends
  const prevMonth = useMemo(() => {
    const idx = availableMonths.indexOf(selectedMonth);
    return idx < availableMonths.length - 1 ? availableMonths[idx + 1] : null;
  }, [availableMonths, selectedMonth]);
  
  const prevOrders = useMemo(() => prevMonth ? filterOrdersByMonth(orders, prevMonth) : [], [orders, prevMonth]);

  // KPIs
  const spend = getTotalSpend(currentOrders);
  const prevSpend = getTotalSpend(prevOrders);
  const spendTrend = prevSpend ? Math.round(((spend - prevSpend) / prevSpend) * 100) : 0;

  const orderCount = getTotalOrders(currentOrders);
  const prevOrderCount = getTotalOrders(prevOrders);
  const orderTrend = prevOrderCount ? Math.round(((orderCount - prevOrderCount) / prevOrderCount) * 100) : 0;

  const calories = getTotalCalories(currentOrders);
  
  const aov = getAverageOrderValue(currentOrders);

  // Full datasets for trends
  const monthlySpendData = useMemo(() => getMonthlySpend(orders), [orders]);
  const calorieTrendData = useMemo(() => getCalorieTrend(orders), [orders]);

  // Monthly specific datasets
  const platformData = useMemo(() => getPlatformBreakdown(currentOrders), [currentOrders]);
  const topRestaurants = useMemo(() => getTopRestaurants(currentOrders), [currentOrders]);
  const categoryData = useMemo(() => getCategoryBreakdown(currentOrders), [currentOrders]);
  const nutrition = useMemo(() => getNutritionSummary(currentOrders), [currentOrders]);
  const timingData = useMemo(() => getOrderTiming(currentOrders), [currentOrders]);
  const weekdayWeekendData = useMemo(() => getWeekdayWeekendAnalysis(currentOrders), [currentOrders]);
  const recentOrders = useMemo(() => getRecentOrders(currentOrders, 10), [currentOrders]);
  
  // Insights
  const insights = useMemo(() => getInsights(currentOrders, prevOrders), [currentOrders, prevOrders]);

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800/50">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">FOODLENS</h1>
            <span className="px-2 py-1 text-[10px] font-bold tracking-wider text-purple-300 bg-purple-500/20 rounded-md uppercase">Demo Data</span>
          </div>
          <p className="text-zinc-400 text-lg">Your Personal Food Intelligence</p>
        </div>
        
        <div className="relative min-w-[240px]">
          <select 
            value={selectedMonth} 
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full appearance-none bg-zinc-900 border border-zinc-700 text-zinc-100 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium cursor-pointer shadow-sm"
          >
            {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
        </div>
      </header>

      {currentOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 rounded-3xl border border-zinc-800/50 border-dashed">
          <Sparkles className="w-12 h-12 text-zinc-600 mb-4" />
          <h2 className="text-xl font-medium text-zinc-300 mb-2">No orders found</h2>
          <p className="text-zinc-500 max-w-md">There are no food orders logged for {selectedMonth}. Try selecting another month to view your insights.</p>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            <KPICard 
              title="Total Spend" 
              value={`₹${spend.toLocaleString('en-IN')}`} 
              icon={<Wallet className="w-5 h-5" />}
              trend={{ value: spendTrend, label: "vs prev month" }}
            />
            <KPICard 
              title="Orders" 
              value={orderCount} 
              icon={<ShoppingBag className="w-5 h-5" />}
              trend={{ value: orderTrend, label: "orders this month" }}
            />
            <KPICard 
              title="Estimated Calories" 
              value={`~${calories.toLocaleString()}`} 
              icon={<Flame className="w-5 h-5 text-orange-500" />}
              subtitle="estimated from delivery orders"
            />
            <KPICard 
              title="Average Order Value" 
              value={`₹${Math.round(aov).toLocaleString('en-IN')}`} 
              icon={<TrendingUp className="w-5 h-5" />}
              subtitle="per order"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Insights Section */}
            <div className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-purple-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  FoodLens Insights
                </h2>
              </div>
              <div className="space-y-4 relative z-10">
                {insights.map((insight, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/60">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <p className="text-zinc-300 text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500">Demo Insights</span>
                <span className="text-[10px] text-zinc-500">AI-powered insights coming soon</span>
              </div>
            </div>

            {/* Top Restaurants */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50 flex flex-col">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-zinc-400" />
                Top Restaurants
              </h2>
              <div className="flex-1">
                {topRestaurants.map((r) => {
                  const maxSpend = topRestaurants[0]?.spend || 1;
                  const pct = Math.max(5, (r.spend / maxSpend) * 100);
                  return (
                    <div key={r.restaurant} className="mb-4 last:mb-0">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-zinc-200">
                          <span className="text-zinc-500 mr-2">#{r.rank}</span> 
                          {r.restaurant}
                        </span>
                        <div className="text-right">
                          <span className="font-semibold text-zinc-100">₹{r.spend.toLocaleString('en-IN')}</span>
                          <span className="text-zinc-500 ml-2 text-xs">({r.orders} orders)</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500/80 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Full Width Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Monthly Spending & Frequency */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Monthly Spending</h2>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlySpendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#f4f4f5' }}
                      itemStyle={{ color: '#e4e4e7' }}
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Spend']}
                      labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                    />
                    <Area type="monotone" dataKey="spend" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Order Frequency */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Order Frequency</h2>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySpendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{ fill: '#27272a' }}
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                      formatter={(val: any) => [val, 'Orders']}
                    />
                    <Bar dataKey="orders" fill="#c084fc" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Platform Analysis */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-zinc-400" />
                Platform Split
              </h2>
              <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="orders"
                      stroke="none"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={(PLATFORM_COLORS as any)[entry.platform] || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold">{orderCount}</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Orders</span>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {platformData.map(p => (
                  <div key={p.platform} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: (PLATFORM_COLORS as any)[p.platform] || '#8b5cf6' }}></div>
                      <span className="text-zinc-300">{p.platform}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-zinc-100">{Math.round(p.orderPercentage)}%</span>
                      <span className="text-zinc-500 ml-2 text-xs">({p.orders})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
              <h2 className="text-xl font-semibold mb-6">What I Eat</h2>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData.slice(0, 8)} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="category" type="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} width={100} />
                    <Tooltip 
                      cursor={{ fill: '#27272a' }}
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                      formatter={(val: any, name: any) => {
                        if (name === 'spend') return [`₹${Math.round(Number(val)).toLocaleString('en-IN')}`, 'Spend'];
                        return [val, name as string];
                      }}
                    />
                    <Bar dataKey="spend" fill="#fb7185" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Nutrition */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Nutrition Overview
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Calories</div>
                  <div className="text-xl font-semibold text-zinc-100">{nutrition.totalCalories.toLocaleString()}</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Protein</div>
                  <div className="text-xl font-semibold text-zinc-100">{Math.round(nutrition.totalProtein)}g</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Carbs</div>
                  <div className="text-xl font-semibold text-zinc-100">{Math.round(nutrition.totalCarbs)}g</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Fat</div>
                  <div className="text-xl font-semibold text-zinc-100">{Math.round(nutrition.totalFat)}g</div>
                </div>
              </div>
              <div className="mt-5 text-xs text-zinc-500 italic">
                * Nutrition values are estimates based on sample food data and should not be treated as medically precise measurements.
              </div>
            </div>

            {/* Order Timing */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-zinc-400" />
                Order Timing
              </h2>
              <div className="space-y-4">
                {timingData.map((t) => (
                  <div key={t.period} className="flex justify-between items-center text-sm bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                    <div>
                      <div className="font-medium text-zinc-200">{t.period.split(' (')[0]}</div>
                      <div className="text-xs text-zinc-500">({t.period.split('(')[1].replace(')', '')})</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-zinc-100">{t.orders} <span className="text-zinc-500 font-normal">orders</span></div>
                      <div className="text-xs text-zinc-400">{Math.round(t.percentage)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekday vs Weekend */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-zinc-400" />
                Weekday vs Weekend
              </h2>
              <div className="space-y-4">
                {weekdayWeekendData.map(w => (
                  <div key={w.type} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-zinc-200">{w.type}</span>
                      <span className="text-lg font-bold text-zinc-50">{w.orders} orders</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-400 border-t border-zinc-800 pt-2 mt-2">
                      <span>Spend: ₹{w.spend.toLocaleString('en-IN')}</span>
                      <span>Avg: ₹{Math.round(w.averageOrderValue).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calorie Trend Full Width */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50 mb-10">
            <h2 className="text-xl font-semibold mb-6">Estimated Calories Trend (Yearly)</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={calorieTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                    formatter={(val: any) => [`${Number(val).toLocaleString()} kcal`, 'Calories']}
                  />
                  <Line type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#18181b' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
            <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-sm">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Platform</th>
                    <th className="pb-3 font-medium">Restaurant</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Est. Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                      <td className="py-4 text-sm">
                        <div className="font-medium text-zinc-200">{o.orderDate}</div>
                        <div className="text-zinc-500 text-xs">{o.orderTime}</div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${o.platform === 'Zomato' ? 'bg-red-500/10 text-red-400' : o.platform === 'Swiggy' ? 'bg-orange-500/10 text-orange-400' : 'bg-purple-500/10 text-purple-400'}`}>
                          {o.platform}
                        </span>
                      </td>
                      <td className="py-4 text-sm font-medium text-zinc-200">{o.restaurant}</td>
                      <td className="py-4 text-sm font-semibold text-zinc-100">₹{o.total.toLocaleString('en-IN')}</td>
                      <td className="py-4 text-sm text-zinc-400">{o.estimatedCalories} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {recentOrders.map((o) => (
                <div key={o.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-zinc-100">{o.restaurant}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{o.orderDate} • {o.orderTime}</div>
                    </div>
                    <span className="font-semibold text-zinc-100">₹{o.total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2 py-0.5 font-medium rounded-md ${o.platform === 'Zomato' ? 'bg-red-500/10 text-red-400' : o.platform === 'Swiggy' ? 'bg-orange-500/10 text-orange-400' : 'bg-purple-500/10 text-purple-400'}`}>
                      {o.platform}
                    </span>
                    <span className="text-zinc-400">{o.estimatedCalories} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
