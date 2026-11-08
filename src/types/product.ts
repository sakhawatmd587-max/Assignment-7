export interface Market { name: string; price: number }
export interface Product {
  id: string; slug: string; name: string; emoji: string;
  unit: string; category: string; price: number; change: number;
  description: string; min: number; max: number; avg: number;
  markets: Market[];
}
