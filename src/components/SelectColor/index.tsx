import { COLORS_PRODUCT } from '@/@types/product';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SelectColorProps {
  color: (typeof COLORS_PRODUCT)[number] | undefined;
  setColor: React.Dispatch<React.SetStateAction<(typeof COLORS_PRODUCT)[number] | undefined>>;
  error?: string;
}

export const SelectColor = ({ color, setColor, error }: SelectColorProps) => {
  return (
    <div className='grid'>
      <Label className='pb-2' htmlFor='color'>
        Cor
      </Label>
      <Select
        value={color?.displayName}
        onValueChange={(value) => {
          const selectedColor = COLORS_PRODUCT.find((color) => color.displayName === value);
          setColor(selectedColor);
        }}
      >
        <SelectTrigger id='color' className='w-full cursor-pointer transition-colors duration-300'>
          <SelectValue placeholder='Selecione uma cor' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {COLORS_PRODUCT.map((color) => (
              <SelectItem
                key={color.type}
                value={color.displayName}
                className='cursor-pointer transition-colors duration-300'
              >
                <span className='inline-block mr-2 w-4 h-4 rounded-full' style={{ backgroundColor: color.color }} />
                {color.displayName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className='text-sm text-error'>{error}</p>}
    </div>
  );
};
