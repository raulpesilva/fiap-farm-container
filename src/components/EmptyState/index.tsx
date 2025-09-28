import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface EmptyStateProps {
  text: string;
  buttonText: string;
  navigateTo: LinkProps['to'];
}

export const EmptyState = ({ text, buttonText, navigateTo }: EmptyStateProps) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <span className='text-sm text-muted-foreground text-center'>{text}</span>
      <span className='text-sm text-muted-foreground text-center'>Cadastre e comece a gerenciar sua fazenda</span>

      <Button className='mt-4 cursor-pointer duration-300' asChild>
        <Link to={navigateTo}>{buttonText}</Link>
      </Button>
    </div>
  );
};
