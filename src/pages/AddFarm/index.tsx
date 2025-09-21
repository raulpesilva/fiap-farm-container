import { lazy, Suspense } from 'react';

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
  return (
    <Suspense fallback={<Fallback />}>
      <Remote />
    </Suspense>
  );
};
