import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/icons/logo.svg';

interface LogoProps {
  width?: string;
}

export const Logo = ({ width }: LogoProps) => {
  return (
    <Link
      to='/'
      className='flex items-center justify-center p-0'
      style={width ? { width: `${width}px` } : { width: '180px' }}
    >
      <img src={LogoIcon} alt='Logo Farm Fiap' />
    </Link>
  );
};
