import type { Transaction, TransactionPayload } from '@/@types/transactions';
import { coreApi } from '@/api';
import { getFarm } from '@/states';
import { removeEmptySearchParam } from '@/utils';

export const addStock = async (content: TransactionPayload) => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const payload = removeEmptySearchParam({
    product_id: content.product_id,
    quantity: content.quantity,
    type: content.type,
    date: content.date,
    total_price: content.type === 'sale' ? content?.total_price : undefined,
  });
  const response = await coreApi.post<Transaction>(`/transactions/${farm.id}`, payload);
  return response.data;
};
