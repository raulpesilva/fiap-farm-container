import type { Storage } from '@/@types/transactions';
import { getFarm } from '@/states';
import { getTransactionsRequest } from '../getTransactions';

export const getStocks = async () => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const response = await getTransactionsRequest<Storage[]>({ filter: 'storage' });
  return response;
};
