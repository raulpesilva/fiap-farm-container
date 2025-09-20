import { dispatchIsAuthenticated, useHasFarmSelect } from '@/states';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFormSignIn = () => {
  const navigate = useNavigate();
  const hasFarm = useHasFarmSelect();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) return setError('Preencha todos os campos');
      // const user = await signInWithEmailAndPassword(auth, email, password);
      // if (user) dispatchIsAuthenticated(true);
      dispatchIsAuthenticated(true);
      navigate(hasFarm ? '/estoques' : '/cadastro-fazenda');
    } catch (error: any) {
      console.log('Error signing in with email and password:', error);
      if (error.message.includes('auth/invalid-email')) return setError('E-mail inválido');
      if (error.message.includes('auth/wrong-password')) return setError('Senha incorreta');
      if (error.message.includes('auth/user-not-found')) return setError('Usuário não encontrado');
      setError('Sign in failed: ' + error.message);
    } finally {
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
    error,
    loading,
    setEmail,
    setPassword,
    handleLogin,
    onChange,
  };
};
