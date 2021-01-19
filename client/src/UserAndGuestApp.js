import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyle from './design/GlobalStyle';
import { Container, Row } from './design/components';
import { Spinner } from './design/elements';
import UserStore from './stores/user/UserStore';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import OrderStore from './stores/order/OrderStore';
import ReviewStore from './stores/review/ReviewStore';
import PrivateRoute from './routes/PrivateRoutes';
import ProductView from './components/userandguest/productView/ProductView';
import Header from './layout/header/Header';
import Footer from './layout/Footer';
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
      <UserStore>
         <GlobalStyle />
         <Router>
            <Suspense fallback={<Spinner />}>
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
                  <Footer />
               </Container>
            </Suspense>
         </Router>
      </UserStore>
   );
};

export default UserAndGuestApp;
