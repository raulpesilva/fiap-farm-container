import type { GoalItem } from '@/@types/goal';
import { createReStateMethods } from '@raulpesilva/re-state';

const GOALS_KEY = 'goals';
const initialValue: GoalItem[] = [];

const methods = createReStateMethods(GOALS_KEY, initialValue);

export const { dispatchGoals, useGoalsSelect, resetGoals } = methods;
