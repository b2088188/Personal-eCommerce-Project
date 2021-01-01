import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const AuthStateContext = createContext();

export const AuthStateProvider = AuthStateContext.Provider;

/* eslint-disable */
export const useAuthState = useContextFactory('AuthStateContext', AuthStateContext);

export default AuthStateContext;