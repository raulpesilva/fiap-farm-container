import type { ICON_MAP } from '../icon';

export interface ProductItem {
  id: number;
  farm_id: number;
  name: string;
  icon: keyof typeof ICON_MAP;
  color: keyof typeof COLOR_MAP;
  created_at: string;
  updated_at: string;
}

export const COLOR_MAP: Record<string, string> = {
  red: '#FF6467',
  orange: '#FF8906',
  yellow: '#FEC745',
  green: '#06DF73',
  blue: '#52A2FF',
  purple: '#A685FF',
  pink: '#FEA5D5',
  brown: '#D1872E',
};

export const getColorByName = (name: string) => {
  if (name?.startsWith('#') || typeof name !== 'string') return name;
  return COLOR_MAP[name] || COLOR_MAP['red'];
};

export interface OptionSelect {
  displayName: string;
  type?: string;
  icon?: keyof typeof ICON_MAP;
  color?: string;
}

export const COLORS_PRODUCT: OptionSelect[] = [
  { displayName: 'Vermelho', type: 'red', color: COLOR_MAP['red'] },
  { displayName: 'Laranja', type: 'orange', color: COLOR_MAP['orange'] },
  { displayName: 'Amarelo', type: 'yellow', color: COLOR_MAP['yellow'] },
  { displayName: 'Verde', type: 'green', color: COLOR_MAP['green'] },
  { displayName: 'Azul', type: 'blue', color: COLOR_MAP['blue'] },
  { displayName: 'Roxo', type: 'purple', color: COLOR_MAP['purple'] },
  { displayName: 'Rosa', type: 'pink', color: COLOR_MAP['pink'] },
  { displayName: 'Marrom', type: 'brown', color: COLOR_MAP['brown'] },
];

export type ColorOptionSelect = (typeof COLORS_PRODUCT)[number];

export const ICONS_PRODUCT: OptionSelect[] = [
  { displayName: 'Banana', type: 'banana', icon: 'banana' },
  { displayName: 'Cenoura', type: 'carrot', icon: 'carrot' },
  { displayName: 'Cereja', type: 'cherry', icon: 'cherry' },
  { displayName: 'Cítrico', type: 'citrus', icon: 'citrus' },
  { displayName: 'Folhagem', type: 'leafy', icon: 'leafy' },
  { displayName: 'Maça', type: 'apple', icon: 'apple' },
  { displayName: 'Semente', type: 'sprout', icon: 'sprout' },
  { displayName: 'Uva', type: 'grape', icon: 'grape' },
  { displayName: 'Vegetal', type: 'vegan', icon: 'vegan' },
];

export type IconOptionSelect = (typeof ICONS_PRODUCT)[number];
