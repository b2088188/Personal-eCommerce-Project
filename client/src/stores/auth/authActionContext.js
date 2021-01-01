import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const AuthActionContext = createContext();

export const AuthActionProvider = AuthActionContext.Provider;

/* eslint-disable */
export const useAuthActions = useContextFactory('AuthActionContext', AuthActionContext);

export default AuthActionContext;