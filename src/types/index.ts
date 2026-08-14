export interface OrderItem {
  name: string;
  quantity: number;
  category: string;
  estimatedCalories: number;
  estimatedProtein: number;
  estimatedCarbs: number;
  estimatedFat: number;
}

export interface Order {
  id: string;
  platform: string;
  restaurant: string;
  orderDate: string;
  orderTime: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  estimatedCalories: number;
  estimatedProtein: number;
  estimatedCarbs: number;
  estimatedFat: number;
  dataQuality: string;
}

export interface Dataset {
  dataset: string;
  description: string;
  period: string;
  orderCount: number;
  orders: Order[];
}
