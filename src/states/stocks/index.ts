import type { Transaction } from '@/@types/transactions';
import { createReStateMethods } from '@raulpesilva/re-state';

const STOCKS_KEY = 'stocks';
const initialValue: Transaction[] = [];

const methods = createReStateMethods(STOCKS_KEY, initialValue);

export const { dispatchStocks: dispatch, useStocksSelect: useSelect, resetStocks } = methods;
export const dispatchTransactions = methods.dispatchStocks;
export const useTransactionsSelect = methods.useStocksSelect;
export const useSalesSelect = () => methods.useStocksSelect().filter((t) => t.type === 'sale');
