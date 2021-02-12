import React, { useEffect, useMemo, useCallback } from 'react';
import { Row } from 'design/components';
import { AuthStateProvider, AuthActionProvider } from './authContext';
import { useQueryClient } from 'react-query';
import { useAsync } from 'utils/hooks';
import axios from 'axios';
import Spinner from 'components/Spinner';

const AuthProvider = ({ children }) => {
   const queryClient = useQueryClient();
   const {
      data: user,
      error,
      isLoading,
      isIdle,
      isError,
      // isSuccess,
      run,
      setData,
      setError
   } = useAsync();
   const isAdmin = user && user.role === 'admin';

   const getInitialAuth = useCallback(async function () {
      try {
         const {
            data: { data }
         } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users`, {
            //withCredentials: true
         });
         return data.user;
      } catch (err) {
         return;
      }
   }, []);

   useEffect(() => {
      run(getInitialAuth());
   }, [getInitialAuth, run]);

   const login = useCallback(
      async function (values) {
         try {
            const {
               data: { data }
            } = await axios.post(
               `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,
               values,
               {
                  //  withCredentials: true
               }
            );
            setData(data.user);
         } catch ({ response: { data } }) {
            setError(data.message);
         }
      },
      [setData, setError]
   );

   const signup = useCallback(
      async function (values) {
         try {
            const {
               data: { data }
            } = await axios.post(
               `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/signup`,
               values,
               {
                  //withCredentials: true
               }
            );
            setData(data.user);
         } catch ({ response: { data } }) {
            setError(data.message);
         }
      },
      [setData, setError]
   );

   // const updateUserData = useCallback(
   //    async function (values) {
   //       const { status } = await fetchAuth(
   //          axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/profile`, values)
   //       );
   //       if (status === 'success') dispatchAuth({ type: UPDATE_USERDATA });
   //    },
   //    [fetchAuth, dispatchAuth]
   // );

   const logout = useCallback(
      async function (values) {
         queryClient.clear();
         try {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`, {
               //withCredentials: true
            });
            setData(null);
         } catch (err) {
            setData(null);
         }
      },
      [setData, queryClient]
   );

   const value = useMemo(
      () => ({
         user,
         isLoading,
         isError,
         error,
         isAdmin
      }),
      [user, isLoading, isError, error, isAdmin]
   );

   const actions = useMemo(
      () => ({
         login,
         signup,
         logout
         //updateUserData
      }),
      [login, signup, logout]
   );

   if (isIdle || isLoading)
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

export default AuthProvider;
