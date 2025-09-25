export interface SaleItem {
  id: number;
  farm_id: number;
  product_id: number;
  type: 'sale';
  value: number;
  amount: number;
  date: string;
  created_at: string;
  updated_at: string;
}
