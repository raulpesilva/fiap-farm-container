import { ICONS_PRODUCT } from '@/@types/product';
import { Icon } from '../Icon';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SelectIconProps {
  icon: (typeof ICONS_PRODUCT)[number] | undefined;
  setIcon: React.Dispatch<React.SetStateAction<(typeof ICONS_PRODUCT)[number] | undefined>>;
  error?: string;
}

export const SelectIcon = ({ icon, setIcon, error }: SelectIconProps) => {
  return (
    <div className='grid'>
      <Label className='pb-2' htmlFor='icon'>
        Ícone
      </Label>
      <Select
        value={icon?.displayName}
        onValueChange={(value) => {
          const selectedIcon = ICONS_PRODUCT.find((icon) => icon.displayName === value);
          setIcon(selectedIcon);
        }}
      >
        <SelectTrigger id='icon' className='w-full cursor-pointer transition-colors duration-300'>
          <SelectValue placeholder='Selecione um ícone' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ICONS_PRODUCT.map((icon) => (
              <SelectItem
                key={icon.type}
                value={icon.displayName}
                className='cursor-pointer transition-colors duration-300'
              >
                <Icon type={icon.icon!} className='inline-block mr-2' />
                {icon.displayName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className='text-sm text-error'>{error}</p>}
    </div>
  );
};
