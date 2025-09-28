import { type GoalItem, COLORS_GOAL, MEASURE_GOAL, TYPE_GOAL } from '@/@types/goal';
import { useProductByProductId } from '@/hooks';
import { formatBRLCurrencyDisplay } from '@/utils';
import { useMemo } from 'react';
import { Icon } from '../Icon';
import { Button } from '../ui/button';
import { Card, CardAction, CardContent, CardTitle } from '../ui/card';

interface GoalCardProps extends Pick<GoalItem, 'name' | 'measure' | 'type' | 'value' | 'target'> {
  product_id: number;
}
export const GoalCard = ({ name, measure, type, value, target, product_id }: GoalCardProps) => {
  const product = useProductByProductId(product_id);
  const color = COLORS_GOAL[type];

  const formattedTarget = useMemo(() => {
    return measure === 'price' ? formatBRLCurrencyDisplay(target) : String(target);
  }, [measure, target]);

  const percentageCompleted = useMemo(() => {
    if (!target || value === 0) return 0;
    const percentage = (value / target) * 100;
    return percentage > 100 ? 100 : Math.round(percentage);
  }, [target, value]);

  return (
    <Card className='w-full h-fit p-0'>
      <CardAction className='w-full'>
        <Button
          variant='ghost'
          className='w-full h-auto justify-start p-0 rounded-xl text-start cursor-pointer duration-300'
        >
          <CardContent className='w-full flex gap-4 items-center p-6'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <div
                className='w-10 min-w-10 h-10 flex flex-col items-center justify-center rounded-lg bg-background'
                style={{ color }}
              >
                <Icon type={product?.icon ?? 'goal'} size={24} />
              </div>
              <span className='text-xs text-muted-foreground'>{percentageCompleted}%</span>
            </div>
            <div className='w-full flex flex-col justify-between items-center'>
              <div className='w-full flex justify-between items-center'>
                <div className='flex flex-col gap-1'>
                  <CardTitle className='text-wrap'>{name}</CardTitle>
                  <p className='text-sm text-muted-foreground'>
                    {TYPE_GOAL[type]} - {product?.name}
                  </p>
                </div>
                <div className='flex flex-col items-end gap-1'>
                  <p className='text-sm text-muted-foreground'>{formattedTarget}</p>
                  <p className='text-sm text-muted-foreground'>{MEASURE_GOAL[measure]}</p>
                </div>
              </div>
              <div className='w-full h-2 bg-muted rounded-full mt-4'>
                <div
                  className='h-2 rounded-full transition-all duration-500'
                  style={{ width: `${percentageCompleted}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </CardContent>
        </Button>
      </CardAction>
    </Card>
  );
};
