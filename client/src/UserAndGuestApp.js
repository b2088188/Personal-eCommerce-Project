import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Footer } from './design/components';
import { Spinner, Message } from './design/elements';
import CartStore from './stores/cart/CartStore';
import PrivateRoute from './routes/PrivateRoutes';
import ProductView from './components/userandguest/productView/ProductView';
import Header from './layout/header/Header';
import { ErrorBoundary } from 'react-error-boundary';
const ProductSearchView = lazy(() =>
   import('./components/userandguest/productView/ProductSearchView')
);
const ProductDetail = lazy(() => import('./components/userandguest/productView/ProductDetail'));
const CartView = lazy(() => import('./components/userandguest/cartView/CartView'));
const ShippingInfo = lazy(() => import('./components/userandguest/placeorder/ShippingInfo'));
const SelectPayment = lazy(() => import('./components/userandguest/placeorder/SelectPayment'));
const PlaceOrder = lazy(() => import('./components/userandguest/placeorder/PlaceOrder'));
const OrderView = lazy(() => import('./components/userandguest/order/OrderView'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Login = lazy(() => import('./components/auth/Login'));
const UserSettings = lazy(() => import('./components/userandguest/profileView/UserSettings'));
const UserOrder = lazy(() => import('./components/userandguest/profileView/UserOrders'));

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
            <CartStore>
               <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <AppRoutes />
               </ErrorBoundary>
            </CartStore>
            <Footer>Copyright &copy; Shunze Lin</Footer>
         </Container>
      </Suspense>
   );
};

const AppRoutes = () => {
   return (
      <>
         <Route path='/signup' exact component={Signup} />
         <Route path='/login' exact component={Login} />
         <PrivateRoute path='/placeorder' exact component={PlaceOrder} />
         <PrivateRoute path='/shipping' exact component={ShippingInfo} />
         <PrivateRoute path='/payment' exact component={SelectPayment} />
         <Route path='/cart' exact component={CartView} />
         <Route path='/' exact component={ProductView} />
         <Route path='/search' exact component={ProductSearchView} />
         <Route path='/products/:productId' exact component={ProductDetail} />
         <PrivateRoute path='/order/:orderId' exact component={OrderView} />
         <PrivateRoute path='/profile/settings' exact component={UserSettings} />
         <PrivateRoute path='/profile/orders' exact component={UserOrder} />
      </>
   );
};

const ErrorFallback = ({ error }) => {
   return (
      <Row>
         <Message text={error.message} severity='error' />;
      </Row>
   );
};

export default UserAndGuestApp;
