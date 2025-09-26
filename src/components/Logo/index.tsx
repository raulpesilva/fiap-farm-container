import { useFarmSelect, useTokenSelect } from '@/states';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/icons/logo.svg';

export const Logo = () => {
  const token = useTokenSelect();
  const farm = useFarmSelect();

  const link = !!token && !farm ? '/cadastro-fazenda' : '/';

  return (
    <Link to={link} className='flex order-0 items-center justify-center p-0 w-32 sm:w-40 md:w-44'>
      <img src={LogoIcon} alt='Logo Farm Fiap' className='w-full aspect-[176/39]' />
    </Link>
  );
};
