import type { User } from '@/@types/user';
import { coreApi } from '@/api';

type SignUpPayload = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export const signUp = async (content: SignUpPayload) => {
  const payload = {
    email: content.email,
    password: content.password,
    name: content.name,
  };
  const response = await coreApi.post<{ token: string }>('/sign-up', payload);
  return response.data;
};
