import { useState } from 'react';

export const useFormSignUp = () => {
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
      // const user = await createUserWithEmailAndPassword(auth, email, password);
      // if (user) dispatchIsAuthenticated(true);
    } catch (error: any) {
      console.log('Error creating account:', error);
      if (error.message.includes('auth/invalid-email')) return setError('E-mail inválido');
      if (error.message.includes('auth/weak-password')) return setError('A senha deve ter pelo menos 6 caracteres');
      if (error.message.includes('auth/email-already-in-use')) return setError('E-mail já cadastrado');
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
