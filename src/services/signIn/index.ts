import type { User } from '@/@types/user';
import { coreApi } from '@/api';

type SignInPayload = Omit<User, 'id' | 'created_at' | 'updated_at' | 'name'>;

export const signIn = async (content: SignInPayload) => {
  const payload = {
    email: content.email,
    password: content.password,
  };
  const response = await coreApi.post<{ token: string }>('/sign-in', payload);
  return response.data;
};
