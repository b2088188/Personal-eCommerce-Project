import { createContext } from 'react';
import useContextFactory from 'customhooks/useContextFactory';

const AuthStateContext = createContext();
AuthStateContext.displayName = 'AuthStateContext';
const AuthActionContext = createContext();
AuthActionContext.displayName = 'AuthActionContext';

export const AuthStateProvider = AuthStateContext.Provider;
export const AuthActionProvider = AuthActionContext.Provider;

/* eslint-disable */
const useAuthState = useContextFactory('AuthStateContext', AuthStateContext);
const useAuthActions = useContextFactory('AuthActionContext', AuthActionContext);
const useAuth = () => [useAuthState(), useAuthActions()];
export default useAuth;
