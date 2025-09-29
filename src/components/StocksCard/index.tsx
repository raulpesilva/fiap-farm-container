import { COLOR_MAP, type ProductItem } from '@/@types/product';
import { Icon } from '../Icon';
import { Button } from '../ui/button';
import { Card, CardAction, CardContent, CardTitle } from '../ui/card';

interface StocksCardProps {
  productName: string;
  productIcon: ProductItem['icon'];
  productColor: string;
  storage: number;
  plant: number;
  harvest: number;
}

export const StocksCard = ({ productName, productIcon, productColor, storage, plant, harvest }: StocksCardProps) => {
  const color = COLOR_MAP[productColor || 'blue'];
  return (
    <Card className='w-full h-auto p-0'>
      <CardAction className='w-full h-full'>
        <Button
          variant='ghost'
          className='w-full h-full justify-start p-0 rounded-xl text-start cursor-pointer duration-300'
        >
          <CardContent className='w-full flex gap-4 items-center p-6'>
            <div
              className='w-10 min-w-10 h-10 flex flex-col items-center justify-center rounded-lg bg-background mb-auto'
              style={{ color }}
            >
              <Icon type={productIcon ?? 'apple'} size={24} />
            </div>
            <div className='flex flex-col w-full'>
              <CardTitle className='text-wrap leading-5'>{productName}</CardTitle>
              <div className='w-full flex justify-between items-center mt-1'>
                <div className='flex flex-col gap-1 *:text-sm text-muted-foreground'>
                  <p>Estoque</p>
                  <p>Plantado</p>
                  <p>Colhido</p>
                </div>
                <div className='ml-auto flex flex-col items-end gap-1'>
                  <p>{storage} un.</p>
                  <p>{plant} un.</p>
                  <p>{harvest} un.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Button>
      </CardAction>
    </Card>
  );
};
