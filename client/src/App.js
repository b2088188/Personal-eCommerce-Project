import React, { lazy, Suspense } from 'react';
import useAuth from './context/auth/authContext';
import { FullPageSpinner } from 'components/Spinner';
const UserAndGuestApp = lazy(() => import('./UserAndGuestApp'));
const AdminApp = lazy(() => import('./AdminApp'));

const App = () => {
   const [{ isAdmin }] = useAuth();
   if (!isAdmin)
      return (
         <Suspense fallback={<FullPageSpinner />}>
            <UserAndGuestApp />
         </Suspense>
      );
   return (
      <Suspense fallback={<FullPageSpinner />}>
         <AdminApp />
      </Suspense>
   );
};

export default App;
