import { ICON_MAP } from '@/@types/icon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: keyof typeof ICON_MAP;
}

export const Icon = ({ type, ...props }: IconProps) => {
  const IconComponent = ICON_MAP[type] || ICON_MAP['apple'];
  if (!IconComponent) return null;

  return <IconComponent {...props} />;
};
