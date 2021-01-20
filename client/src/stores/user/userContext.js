import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const UserStateContext = createContext();
UserStateContext.displayName = 'UserStateContext';
const UserActionContext = createContext();
UserActionContext.displayName = 'UserActionContext';

export const UserStateProvider = UserStateContext.Provider;
export const UserActionProvider = UserActionContext.Provider;
/* eslint-disable */
const useUserState = useContextFactory('UserStateContext', UserStateContext);
const useUserActions = useContextFactory('UserActionContext', UserActionContext);
const useUser = () => [useUserState(), useUserActions()];
export default useUser;
