import type { ProductItem } from '@/@types/product';
import { createReStateMethods } from '@raulpesilva/re-state';

const PRODUCTS_KEY = 'products';
const initialValue: ProductItem[] = [];

const methods = createReStateMethods(PRODUCTS_KEY, initialValue);

export const { dispatchProducts, useProductsSelect, resetProducts } = methods;
