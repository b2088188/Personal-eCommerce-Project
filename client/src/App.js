import React, { lazy, Suspense } from 'react';
import useAuth from './stores/auth/authContext';
import { Container } from './design/components';
import { Spinner } from './design/elements';
const UserAndGuestApp = React.lazy(() => import('./UserAndGuestApp'));
const AdminApp = React.lazy(() => import('./AdminApp'));

const App = () => {
   const [{ isAdmin }] = useAuth();
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
