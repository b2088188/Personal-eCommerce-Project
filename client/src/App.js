import React, { lazy, Suspense } from 'react';
import useAuth from './context/auth/authContext';
import { Container } from './design/components';
import Spinner from 'components/Spinner';
const UserAndGuestApp = lazy(() => import('./UserAndGuestApp'));
const AdminApp = lazy(() => import('./AdminApp'));

const App = () => {
   const [{ isAdmin }] = useAuth();
   if (!isAdmin)
      return (
         <Suspense fallback={<Spinner modifiers='dark' />}>
            <UserAndGuestApp />
         </Suspense>
      );
   return (
      <Suspense fallback={<Spinner modifiers='dark' />}>
         <AdminApp />
      </Suspense>
   );
};

export default App;
