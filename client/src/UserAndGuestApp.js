import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Container, Footer } from './design/components';
import CartProvider from './context/cart/CartProvider';
import PrivateRoute from './routes/PrivateRoutes';
import ProductView from './screen/userandguest/product/ProductView';
import Header from './layout/header/Header';
import { FullPageSpinner } from 'components/Spinner';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorNotFound, ErrorFallback } from './components/Error';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ProductSearchView = lazy(() => import('./screen/userandguest/product/ProductSearchView'));
const ProductDetail = lazy(() => import('./screen/userandguest/product/ProductDetail'));
const CartView = lazy(() => import('./screen/userandguest/cart/CartView'));
const ShippingInfo = lazy(() => import('./screen/userandguest/placeorder/ShippingInfo'));
const SelectPayment = lazy(() => import('./screen/userandguest/placeorder/SelectPayment'));
const PlaceOrder = lazy(() => import('./screen/userandguest/placeorder/PlaceOrder'));
const OrderView = lazy(() => import('./screen/userandguest/order/OrderView'));
const Signup = lazy(() => import('./screen/auth/Signup'));
const Login = lazy(() => import('./screen/auth/Login'));
const UserSettings = lazy(() => import('./screen/userandguest/profile/UserSettings'));
const UserOrder = lazy(() => import('./screen/userandguest/profile/UserOrders'));

const UserAndGuestApp = () => {
   return (
      <Suspense fallback={<FullPageSpinner />}>
         <Container>
            <Header />
            <QueryErrorResetBoundary>
               {({ reset }) => (
                  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
                     <AppRoutes />
                  </ErrorBoundary>
               )}
            </QueryErrorResetBoundary>
            <Footer>Copyright &copy; Shunze Lin</Footer>
         </Container>
      </Suspense>
   );
};

const AppRoutes = () => {
   const location = useLocation();
   return (
      <TransitionGroup component={null}>
         <CSSTransition
            timeout={{
               appear: 250,
               enter: 250,
               exit: 250
            }}
            classNames='item'
            key={location.key}
         >
            <Switch location={location}>
               <Route path='/signup' component={Signup} />
               <Route path='/login' component={Login} />
               <CartProvider>
                  <PrivateRoute path='/placeorder' component={PlaceOrder} />
                  <PrivateRoute path='/shipping' component={ShippingInfo} />
                  <PrivateRoute path='/payment' component={SelectPayment} />
                  <Route path='/cart' component={CartView} />
                  <Route path='/' exact component={ProductView} />
                  <Route path='/products/search' component={ProductSearchView} />
                  <Route path='/products/:productId' component={ProductDetail} />
               </CartProvider>
               <PrivateRoute path='/order/:orderId' component={OrderView} />
               <PrivateRoute path='/profile/settings' component={UserSettings} />
               <PrivateRoute path='/profile/orders' component={UserOrder} />
               <Route path='*' component={ErrorNotFound} />
            </Switch>
         </CSSTransition>
      </TransitionGroup>
   );
};

export default UserAndGuestApp;
