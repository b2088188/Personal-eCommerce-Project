import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const UserActionContext = createContext();
UserActionContext.displayName = 'UserActionContext';

export const UserActionProvider = UserActionContext.Provider;

/* eslint-disable */
export const useUserActions = useContextFactory(
	'UserActionContext',
	UserActionContext
);

export default UserActionContext;
