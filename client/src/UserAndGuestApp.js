import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Footer } from './design/components';
import { Spinner } from './design/elements';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import OrderStore from './stores/order/OrderStore';
import ReviewStore from './stores/review/ReviewStore';
import PrivateRoute from './routes/PrivateRoutes';
import ProductView from './components/userandguest/productView/ProductView';
import Header from './layout/header/Header';
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
            <Route path='/signup' exact component={Signup} />
            <Route path='/login' exact component={Login} />
            <OrderStore>
               <CartStore>
                  <PrivateRoute path='/placeorder' exact component={PlaceOrder} />
                  <PrivateRoute path='/shipping' exact component={ShippingInfo} />
                  <PrivateRoute path='/payment' exact component={SelectPayment} />
                  <Route path='/cart' exact component={CartView} />
                  <ProductStore>
                     <ReviewStore>
                        <Route path='/' exact component={ProductView} />
                        <Route path='/search' exact component={ProductSearchView} />
                        <Route path='/products/:productId' exact component={ProductDetail} />
                     </ReviewStore>
                  </ProductStore>
               </CartStore>
               <PrivateRoute path='/order/:orderId' exact component={OrderView} />
               <PrivateRoute path='/profile/settings' exact component={UserSettings} />
               <PrivateRoute path='/profile/orders' exact component={UserOrder} />
            </OrderStore>
            <Footer>Copyright &copy; Shunze Lin</Footer>
         </Container>
      </Suspense>
   );
};

export default UserAndGuestApp;
