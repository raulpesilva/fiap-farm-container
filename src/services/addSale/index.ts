import type { Sale } from '@/@types/transactions';
import { addStock } from '../addStock';

type AddSalePayload = Omit<Sale, 'id' | 'farm_id' | 'created_at' | 'updated_at' | 'price' | 'type'>;

export const addSale = async (content: AddSalePayload) => {
  const payload = {
    product_id: content.product_id,
    quantity: content.quantity,
    total_price: content.total_price,
    date: content.date,
    type: 'sale' as const,
  };
  const response = await addStock(payload);
  return response;
};
