import * as R from 'ramda';
import React, { useEffect, useMemo, useCallback } from 'react';
import { Row } from '../../design/components';
import { AuthStateProvider, AuthActionProvider } from './authContext';
import authReducer from './authReducer';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import { GET_AUTHINFO, LOGOUT_AUTH, UPDATE_USERDATA } from '../types';
import { Spinner } from '../../design/elements';

const AuthStore = ({ children }) => {
   const [stateAuth, fetchAuth, dispatchAuth] = useFetch(
      {
         data: {},
         user: null,
         initialAuthCheck: false
      },
      authReducer
   );
   const isAdmin = stateAuth.user && stateAuth.user.role === 'admin';

   const getInitialAuth = useCallback(
      async function () {
         const { status } = await fetchAuth(axios.get('/api/v1/users'));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );

   useEffect(() => {
      getInitialAuth();
   }, [getInitialAuth]);

   const login = useCallback(
      async function (values) {
         const { status } = await fetchAuth(axios.post('/api/v1/users/login', values));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );

   const signup = useCallback(
      async function (values) {
         const { status } = await fetchAuth(axios.post('/api/v1/users/signup', values));
         if (status === 'success') dispatchAuth({ type: GET_AUTHINFO });
      },
      [fetchAuth, dispatchAuth]
   );

   const updateUserData = useCallback(
      async function (values) {
         const { status } = await fetchAuth(axios.patch('/api/v1/users/profile', values));
         if (status === 'success') dispatchAuth({ type: UPDATE_USERDATA });
      },
      [fetchAuth, dispatchAuth]
   );

   const logout = useCallback(
      async function (values) {
         await fetchAuth(axios.get('/api/v1/users/logout'));
         dispatchAuth({ type: LOGOUT_AUTH });
      },
      [fetchAuth, dispatchAuth]
   );

   const value = useMemo(
      () => ({
         user: stateAuth.user,
         statusAuth: stateAuth.status,
         errorAuth: stateAuth.error,
         isAdmin
      }),
      [stateAuth, isAdmin]
   );

   const actions = useMemo(
      () => ({
         login,
         signup,
         logout,
         updateUserData
      }),
      [login, signup, logout, updateUserData]
   );

   if (!stateAuth.initialAuthCheck)
      return (
         <Row>
            <Spinner modifiers='dark' />
         </Row>
      );

   return (
      <AuthStateProvider value={value}>
         <AuthActionProvider value={actions}>{children}</AuthActionProvider>
      </AuthStateProvider>
   );
};

export default AuthStore;
