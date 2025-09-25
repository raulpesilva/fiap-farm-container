import { createReStateMethods } from '@raulpesilva/re-state';

const FARM_KEY = 'farm';

interface Farm {
  user_id: number;
  name: string;
  id: number;
  created_at: string;
  updated_at: string;
}

const initialValue = null as Farm | null;

const methods = createReStateMethods(FARM_KEY, initialValue);
export const { dispatchFarm, useFarmSelect, getFarm, resetFarm } = methods;
