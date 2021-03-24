import React, { useEffect, useMemo, useCallback } from 'react';
import { AuthStateProvider, AuthActionProvider } from './authContext';
import { useAsync } from 'utils/hooks';
import { authRequest } from 'apis/backend';
import { FullPageSpinner } from 'components/Spinner';
import { queryClient } from 'context';

async function getInitialAuth() {
   try {
      const {
         data: { data }
      } = await authRequest.get('/');
      return data.user;
   } catch (err) {
      return;
   }
}
const userPromise = getInitialAuth();

const AuthProvider = ({ children }) => {
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

   useEffect(() => {
      run(userPromise);
   }, [run]);

   const login = useCallback(
      async function (values) {
         try {
            const {
               data: { data }
            } = await authRequest.post('/login', values);
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
            } = await authRequest.post('/signup', values);
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
            await authRequest.get('/logout');
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
         logout,
         setData,
         setError
         //updateUserData
      }),
      [login, signup, logout, setData, setError]
   );

   if (isIdle || isLoading) return <FullPageSpinner />;

   return (
      <AuthStateProvider value={value}>
         <AuthActionProvider value={actions}>{children}</AuthActionProvider>
      </AuthStateProvider>
   );
};

export default AuthProvider;
