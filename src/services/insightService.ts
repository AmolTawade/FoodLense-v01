import type { Order } from '../types';
import { 
  getTotalSpend, 
  getAverageOrderValue, 
  getTopRestaurants, 
  getCategoryBreakdown, 
  getOrderTiming, 
  getPlatformBreakdown, 
  getWeekdayWeekendAnalysis 
} from './analyticsService';

export function getInsights(currentOrders: Order[], prevOrders: Order[]): string[] {
  const insights: string[] = [];

  if (currentOrders.length === 0) {
    return ["No orders found for the selected month to generate insights."];
  }

  // 1. Spending comparison
  const currentSpend = getTotalSpend(currentOrders);
  const prevSpend = getTotalSpend(prevOrders);
  
  if (prevOrders.length > 0) {
    if (currentSpend > prevSpend) {
      const diff = currentSpend - prevSpend;
      insights.push(`Spending increased by ₹${diff.toLocaleString('en-IN')} compared to the previous month.`);
    } else if (currentSpend < prevSpend) {
      const diff = prevSpend - currentSpend;
      insights.push(`Great job! You spent ₹${diff.toLocaleString('en-IN')} less than the previous month.`);
    }
    
    // 2. AOV comparison
    const currentAOV = getAverageOrderValue(currentOrders);
    const prevAOV = getAverageOrderValue(prevOrders);
    if (currentAOV > prevAOV) {
      insights.push(`Your average order value increased to ₹${Math.round(currentAOV).toLocaleString('en-IN')}.`);
    } else if (currentAOV < prevAOV) {
      insights.push(`Your average order value decreased this month, showing better cost control per order.`);
    }
  }

  // 3. Highest spend restaurant
  const topRestaurants = getTopRestaurants(currentOrders);
  if (topRestaurants.length > 0) {
    insights.push(`Your favorite spot was ${topRestaurants[0].restaurant}, where you spent ₹${Math.round(topRestaurants[0].spend).toLocaleString('en-IN')}.`);
  }

  // 4. Highest calorie category
  const categories = getCategoryBreakdown(currentOrders);
  // sort categories by calories instead of spend
  categories.sort((a, b) => b.calories - a.calories);
  if (categories.length > 0) {
    insights.push(`You consumed the most estimated calories from the ${categories[0].category} category.`);
  }

  // 5. Order timing preference
  const timings = getOrderTiming(currentOrders);
  if (timings.length > 0 && timings[0].orders > 0) {
    insights.push(`You prefer ordering during the ${timings[0].period.split(' (')[0]}, which accounts for ${Math.round(timings[0].percentage)}% of your orders.`);
  }

  // 6. Weekday vs Weekend
  const weekStats = getWeekdayWeekendAnalysis(currentOrders);
  const weekOrders = weekStats.find(w => w.type === 'Weekdays')?.orders || 0;
  const weekendOrders = weekStats.find(w => w.type === 'Weekends')?.orders || 0;
  
  if (weekendOrders > weekOrders) {
    insights.push("You tend to order more frequently on weekends than during the week.");
  } else if (weekOrders > weekendOrders) {
    insights.push("Your weekday ordering frequency is higher than your weekend ordering.");
  }

  // 7. Platform preference
  const platforms = getPlatformBreakdown(currentOrders);
  if (platforms.length > 0) {
    insights.push(`You preferred ${platforms[0].platform}, using it for ${Math.round(platforms[0].orderPercentage)}% of your orders this month.`);
  }

  // Return a sample of 4 insights to keep it concise
  return insights.slice(0, 4);
}
