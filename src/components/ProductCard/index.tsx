import type { ProductItem } from '@/@types/product';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { Button } from '../ui/button';
import { Card, CardAction, CardContent, CardTitle } from '../ui/card';

type ProductCardProps = Pick<ProductItem, 'id' | 'name' | 'icon' | 'color'>;

export const ProductCard = ({ id, name, icon, color }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className='w-full h-auto p-0'>
      <CardAction className='w-full h-full'>
        <Button
          variant='ghost'
          className='w-full h-full justify-start p-0 rounded-xl text-start cursor-pointer duration-300'
          onClick={() => navigate(`/produtos/${id}`)}
        >
          <CardContent className='w-full flex gap-4 items-center p-6'>
            <div
              className='w-10 min-w-10 h-10 flex items-center justify-center rounded-lg bg-background'
              style={{ color: color }}
            >
              <Icon type={icon} size={24} />
            </div>
            <CardTitle className='text-wrap'>{name}</CardTitle>
          </CardContent>
        </Button>
      </CardAction>
    </Card>
  );
};
