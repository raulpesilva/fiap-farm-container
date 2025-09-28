import type { Transaction } from '@/@types/transactions';

type GroupType = Pick<Transaction, 'id' | 'farm_id' | 'product_id' | 'created_at' | 'updated_at'> & {
  storage: number;
  plant: number;
  harvest: number;
};

export const groupByStock = (stocks: Transaction[]) => {
  if (stocks.length === 0) return [];
  const group = stocks.reduce((acc, stock) => {
    if (stock.type === 'sale') return acc; // Ignore sales
    const key = stock.product_id;

    if (!acc[key]) {
      acc[key] = {
        id: stock.id,
        farm_id: stock.farm_id,
        product_id: stock.product_id,
        storage: 0,
        plant: 0,
        harvest: 0,
        created_at: stock.created_at,
        updated_at: stock.updated_at,
      };
    }

    acc[key][stock.type] += stock.quantity;

    return acc;
  }, {} as Record<number, GroupType>);

  return Object.values(group);
};
