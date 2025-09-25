import { useFarmSelect } from '@/states';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/icons/logo.svg';

interface LogoProps {
  width?: string;
}

export const Logo = ({ width }: LogoProps) => {
  const farm = useFarmSelect();
  const isMobile = window.innerWidth < 768;

  const link = !farm ? '/cadastro-fazenda' : '/';

  return (
    <Link
      to={link}
      className='flex order-0 items-center justify-center p-0'
      style={width ? { width: `${width}px` } : { width: isMobile ? '120px' : '180px' }}
    >
      <img src={LogoIcon} alt='Logo Farm Fiap' />
    </Link>
  );
};
