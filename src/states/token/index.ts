import type { PublicUser } from '@/@types/user';
import { createReStateMethods, onReStateChange } from '@raulpesilva/re-state';
import * as jose from 'jose';
import { dispatchUser } from '../user';

const TOKEN_KEY = 'token';
const initialValue = null as string | null;

const methods = createReStateMethods(TOKEN_KEY, initialValue);
export const { dispatchToken, useTokenSelect, getToken, resetToken } = methods;

onReStateChange(async () => {
  try {
    const token = getToken();
    if (token) {
      const user = jose.decodeJwt<PublicUser>(token);
      dispatchUser(user);
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      dispatchUser({} as PublicUser);
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Error handling token in AsyncStorage', error);
  }
}, [TOKEN_KEY]);
