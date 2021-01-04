import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const UserStateContext = createContext();
UserStateContext.displayName = 'UserStateContext';

export const UserStateProvider = UserStateContext.Provider;

/* eslint-disable */
export const useUserState = useContextFactory('UserStateContext', UserStateContext);

export default UserStateContext;