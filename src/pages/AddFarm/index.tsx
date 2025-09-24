import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Remote = lazy(
  // @ts-expect-error mfe
  async () => import('remote/fiap-farm-mfe')
);

const Fallback = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <span className='text-primary-foreground text-xs'>Loading...</span>
    </div>
  );
};

export const AddFarm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => navigate('/');
    window.addEventListener('goStocks', handler);
    return () => window.removeEventListener('goStocks', handler);
  }, [navigate]);

  return (
    <Suspense fallback={<Fallback />}>
      <Remote />
    </Suspense>
  );
};
