import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { Container, Row, Footer } from './design/components';
import Spinner from 'components/Spinner';
import { Message } from 'components/Message';
import CartProvider from './context/cart/CartProvider';
import PrivateRoute from './routes/PrivateRoutes';
import ProductView from './screen/userandguest/product/ProductView';
import Header from './layout/header/Header';
import { ErrorBoundary } from 'react-error-boundary';
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
const ErrorNotFound = lazy(() => import('./screen/error/ErrorNotFound'));

const UserAndGuestApp = () => {
   return (
      <Suspense
         fallback={
            <Row>
               <Spinner modifiers='dark' />
            </Row>
         }
      >
         <Container>
            <Header />
            <CartProvider>
               <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <AppRoutes />
               </ErrorBoundary>
            </CartProvider>
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
               <PrivateRoute path='/placeorder' component={PlaceOrder} />
               <PrivateRoute path='/shipping' component={ShippingInfo} />
               <PrivateRoute path='/payment' component={SelectPayment} />
               <Route path='/cart' component={CartView} />
               <Route path='/' exact component={ProductView} />
               <Route path='/search' component={ProductSearchView} />
               <Route path='/products/:productId' component={ProductDetail} />
               <PrivateRoute path='/order/:orderId' component={OrderView} />
               <PrivateRoute path='/profile/settings' component={UserSettings} />
               <PrivateRoute path='/profile/orders' component={UserOrder} />
               <Route path='*' component={ErrorNotFound} />
            </Switch>
         </CSSTransition>
      </TransitionGroup>
   );
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
   const history = useHistory();

   history.listen((location, action) => {
      if (error) resetErrorBoundary();
   });
   return (
      <Row>
         <Message text={error.message} severity='error' />;
      </Row>
   );
};

export default UserAndGuestApp;
