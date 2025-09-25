export interface StockItem {
  id: number;
  farm_id: number;
  product_id: number;
  type: 'storage' | 'plant' | 'harvest';
  value: number;
  amount: number;
  date: string;
  created_at: string;
  updated_at: string;
  discountPreviousStep: boolean;
}
