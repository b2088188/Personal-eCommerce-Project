import React, { lazy, Suspense } from 'react';
import { useAuthState } from './stores/auth/authStateContext';
import { Container } from './design/components';
import { Spinner } from './design/elements';
const UserAndGuestApp = React.lazy(() => import('./UserAndGuestApp'));
const AdminApp = React.lazy(() => import('./AdminApp'));

const App = () => {
   const { isAdmin } = useAuthState();
   if (!isAdmin)
      return (
         <Suspense
            fallback={
               <Container>
                  <Spinner modifiers='dark' />
               </Container>
            }
         >
            <UserAndGuestApp />
         </Suspense>
      );
   return (
      <Suspense
         fallback={
            <Container>
               <Spinner modifiers='dark' />
            </Container>
         }
      >
         <AdminApp />
      </Suspense>
   );
};

export default App;
