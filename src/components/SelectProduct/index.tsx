import type { OptionSelect } from '@/@types/product';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '../Icon';

interface SelectProductProps {
  products: OptionSelect[];
  product: OptionSelect | undefined;
  setProduct: React.Dispatch<React.SetStateAction<OptionSelect | undefined>>;
  error: string;
}

export const SelectProduct = ({ products, product, setProduct, error }: SelectProductProps) => {
  return (
    <div className='grid'>
      <Label className='pb-2' htmlFor='product'>
        Produto
      </Label>
      <Select
        value={product?.displayName || ''}
        onValueChange={(value) => {
          const selectedProduct = products.find((product) => product.displayName === value);
          setProduct(selectedProduct);
        }}
      >
        <SelectTrigger id='product' className='w-full cursor-pointer transition-colors duration-300'>
          <SelectValue placeholder='Selecione um produto' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {products.map((product) => (
              <SelectItem key={product.type} value={product.displayName} className='duration-300'>
                <Icon type={product.icon!} className='inline-block mr-2' />
                {product.displayName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className='text-sm text-error'>{error}</p>}
    </div>
  );
};
