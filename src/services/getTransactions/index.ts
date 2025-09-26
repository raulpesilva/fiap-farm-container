import type { Transaction } from '@/@types/transactions';
import { coreApi } from '@/api';
import { getFarm } from '@/states';
import { removeEmptySearchParam } from '@/utils';

interface GetTransactionsProps {
  filter?: string;
}
export const getTransactionsRequest = async <T = Transaction[]>({ filter = '' }: GetTransactionsProps = {}) => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const searchParams = new URLSearchParams(removeEmptySearchParam({ filter }));
  const response = await coreApi.get<T>(`/transactions/${farm.id}`, { params: searchParams });
  return response.data;
};
