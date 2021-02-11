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
