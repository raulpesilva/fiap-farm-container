import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getMyFarm, signIn } from '@/services';
import { dispatchFarm, dispatchToken } from '@/states';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';

const useFormSignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const math = useMatch('/login');

  const handleLogin = async () => {
    try {
      if (!email || !password) return setError('Preencha todos os campos');
      setLoading(true);
      const response = await signIn({ email, password });
      dispatchToken(response.token);
      try {
        const farm = await getMyFarm();
        dispatchFarm(farm);
        if (math) navigate('/');
      } catch {
        dispatchFarm(null);
        if (math) navigate('/cadastro-fazenda');
      }
    } catch (error: any) {
      console.log('Error signing in with email and password:', error);
      let message = 'Sign in failed: ' + error?.message;
      if (error?.response?.data?.error?.includes('email or password is incorrect'))
        message = 'E-mail ou senha incorretos';
      setError(message);
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError('');
  };

  return { email, password, error, loading, setEmail, setPassword, handleLogin, onChange };
};

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
              <div className='grid gap-2'>
                <Label htmlFor='email'>E-mail</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='exemplo@email.com'
                  onChange={(e) => onChange(setEmail, e.target.value)}
                  value={email}
                />
              </div>
              <div className='grid gap-2'>
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
