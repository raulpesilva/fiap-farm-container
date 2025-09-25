import type { PublicUser } from '@/@types/user';
import { createReStateMethods } from '@raulpesilva/re-state';

const USER_KEY = 'user';

const initialValue = {} as PublicUser;
const methods = createReStateMethods(USER_KEY, initialValue);
export const { dispatchUser, useUserSelect, getUser, resetUser } = methods;
