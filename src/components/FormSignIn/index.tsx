import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormSignIn } from '@/hooks';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FormSignIn({ className, ...props }: React.ComponentProps<'div'>) {
  const { email, password, error, loading, setEmail, setPassword, handleLogin, onChange } = useFormSignIn();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>Digite seu e-mail abaixo para acessar sua conta</CardDescription>
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

              {error && <p className='text-sm text-error text-center'>{error}</p>}

              <Button
                type='submit'
                className='w-full cursor-pointer duration-300'
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                disabled={loading}
              >
                {loading ? <LoaderCircle className='animate-spin' /> : 'Entrar'}
              </Button>
            </div>

            <div className='mt-4 text-center text-sm'>
              Não tem uma conta?{' '}
              <Link to='/cadastro' className='underline underline-offset-4'>
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
