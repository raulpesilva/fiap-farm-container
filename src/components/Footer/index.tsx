import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className='w-full min-h-20 flex items-center justify-center'>
      <div className='w-full max-w-[1200px] h-full flex flex-col items-center justify-center gap-2 mx-4 border-t border-solid border-card'>
        <div className='w-28 flex items-center justify-center'>
          <Logo />
        </div>

        <span className='text-sm text-primary-foreground'>© 2025 Copyright: Farm Fiap</span>
      </div>
    </footer>
  );
};
