import { createReStateMethods } from '@raulpesilva/re-state';

const IS_AUTHENTICATED_KEY = 'isAuthenticated';
const initialValue = true;

const methods = createReStateMethods(IS_AUTHENTICATED_KEY, initialValue);
export const { dispatchIsAuthenticated, useIsAuthenticatedSelect } = methods;
