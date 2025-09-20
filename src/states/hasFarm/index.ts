import { createReStateMethods } from '@raulpesilva/re-state';

const HAS_FARM_KEY = 'hasFarm';
const initialValue = true;

const methods = createReStateMethods(HAS_FARM_KEY, initialValue);
export const { dispatchHasFarm, useHasFarmSelect } = methods;
