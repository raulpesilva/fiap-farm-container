import { lazy, Suspense } from 'react';

const Remote = lazy(
  // @ts-expect-error mfe
  async () => import('remote/fiap-farm-mfe')
);

export const AddFarm = () => {
  return (
    <Suspense fallback='loading...'>
      <Remote />
    </Suspense>
  );
};
