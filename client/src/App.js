import './base.scss';
import React, { lazy, Suspense } from 'react';
import { useAuthState } from './stores/auth/authStateContext';
import { Spinner } from './design/elements';
const UserAndGuestApp = React.lazy(() => import('./UserAndGuestApp'));
const AdminApp = React.lazy(() => import('./AdminApp'));

const App = () => {
   const { isAdmin } = useAuthState();
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
