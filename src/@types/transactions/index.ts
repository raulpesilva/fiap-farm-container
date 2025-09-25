export interface TransactionBase {
  id: number;
  farm_id: number;
  product_id: number;
  date: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface Storage extends TransactionBase {
  type: 'storage';
  quantity: number;
}
export interface Sale extends TransactionBase {
  type: 'sale';
  quantity: number;
  price: number;
  total_price: number;
}
export interface Plant extends TransactionBase {
  type: 'plant';
  quantity: number;
}
export interface Harvest extends TransactionBase {
  type: 'harvest';
  quantity: number;
}

export type Transaction = Storage | Sale | Plant | Harvest;

type RemoveCommon<T> = Omit<T, 'id' | 'created_at' | 'updated_at' | 'farm_id' | 'price'>;

export type TransactionPayload =
  | RemoveCommon<Storage>
  | RemoveCommon<Sale>
  | RemoveCommon<Plant>
  | RemoveCommon<Harvest>;
