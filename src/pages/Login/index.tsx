import { FormSignIn } from '@/components';

export const Login = () => {
  return (
    <section className='w-full h-full flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        <FormSignIn />
      </div>
    </section>
  );
};
