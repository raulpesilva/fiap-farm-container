import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { dispatchToken } from '@/states';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useFormSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) return setError('As senhas não coincidem');
    try {
      setLoading(true);
      if (!email || !password || !confirmPassword) return setError('Preencha todos os campos');
      dispatchToken('fake-jwt-token');
    } catch (error: any) {
      console.log('Error creating account:', error);
      if (error.message.includes('auth/invalid-email')) return setError('E-mail inválido');
      if (error.message.includes('auth/weak-password')) return setError('A senha deve ter pelo menos 6 caracteres');
      if (error.message.includes('auth/email-already-in-use')) return setError('E-mail já cadastrado');
      setError('Sign in failed: ' + error.message);
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError('');
  };

  return {
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
  };
};

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
