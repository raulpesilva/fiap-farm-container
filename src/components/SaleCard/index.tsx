import { COLOR_MAP } from '@/@types/product';
import { useProductByProductId } from '@/hooks';
import { formatBRLCurrencyDisplay } from '@/utils';
import { Icon } from '../Icon';
import { Button } from '../ui/button';
import { Card, CardAction, CardContent } from '../ui/card';

interface SaleCardProps {
  price: number;
  quantity: number;
  product_id: number;
  total_price: number;
}

export const SaleCard = ({ price, quantity, total_price, product_id }: SaleCardProps) => {
  const product = useProductByProductId(product_id);
  const color = COLOR_MAP[product?.color || 'blue'];

  return (
    <Card className='w-full h-fit p-0'>
      <CardAction className='w-full'>
        <Button
          variant='ghost'
          className='w-full h-auto justify-start p-0 rounded-xl text-start cursor-pointer duration-300'
        >
          <CardContent className='w-full flex gap-4 items-center p-6'>
            <div
              className='w-10 min-w-10 h-10 flex flex-col items-center justify-center rounded-lg bg-background'
              style={{ color }}
            >
              <Icon type={product?.icon ?? 'apple'} size={24} />
            </div>
            <div className='flex flex-col gap-1'>
              <p>{product?.name}</p>
              <p className='text-neutral-500'>{formatBRLCurrencyDisplay(price)}/un</p>
            </div>
            <div className='ml-auto flex flex-col items-end gap-1'>
              <p>{quantity}</p>
              <p>{formatBRLCurrencyDisplay(total_price)}</p>
            </div>
          </CardContent>
        </Button>
      </CardAction>
    </Card>
  );
};
