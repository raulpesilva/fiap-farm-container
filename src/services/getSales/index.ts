import type { Sale } from '@/@types/transactions';
import { getFarm } from '@/states';
import { getTransactionsRequest } from '../getTransactions';

export const getSales = async () => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const response = await getTransactionsRequest<Sale[]>({ filter: 'sale' });
  return response;
};
