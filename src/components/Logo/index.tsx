import { useFarmSelect, useTokenSelect } from '@/states';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';

export const Logo = () => {
  const token = useTokenSelect();
  const farm = useFarmSelect();

  const link = !!token && !farm ? '/cadastro-fazenda' : '/';

  return (
    <Link to={link} className='flex order-0 items-center justify-center p-0 w-32 sm:w-40 md:w-44'>
      <Icon type='logo' className='w-full h-fit aspect-[176/39]' />
    </Link>
  );
};
