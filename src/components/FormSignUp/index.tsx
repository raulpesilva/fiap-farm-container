import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormSignUp } from '@/hooks';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FormSignUp({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    email,
    password,
    confirmPassword,
    error,
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleCreateAccount,
    onChange,
  } = useFormSignUp();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Preencha os dados abaixo para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>E-mail</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='exemplo@email.com'
                  onChange={(e) => onChange(setEmail, e.target.value)}
                  value={email}
                />
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='password'>Senha</Label>
                <Input
                  id='password'
                  type='password'
                  onChange={(e) => onChange(setPassword, e.target.value)}
                  value={password}
                />
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='confirm-password'>Confirmar senha</Label>
                <Input
                  id='confirm-password'
                  type='password'
                  onChange={(e) => onChange(setConfirmPassword, e.target.value)}
                  value={confirmPassword}
                />
              </div>

              {error && <p className='text-sm text-error text-center'>{error}</p>}

              <Button
                type='submit'
                className='w-full cursor-pointer duration-300'
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateAccount();
                }}
                disabled={loading}
              >
                {loading ? <LoaderCircle className='animate-spin' /> : 'Cadastrar'}
              </Button>
            </div>

            <div className='mt-4 text-center text-sm'>
              Já tem uma conta?{' '}
              <Link to='/login' className='underline underline-offset-4'>
                Entre
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
