import './base.scss';
import React, {lazy, Suspense} from 'react';
import GlobalStyle from './design/GlobalStyle';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthStore from './stores/auth/AuthStore';
import UserStore from './stores/user/UserStore';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import OrderStore from './stores/order/OrderStore';
import ReviewStore from './stores/review/ReviewStore';
import PrivateRoute from './routes/PrivateRoutes';
import ProductView from './components/productView/ProductView';
import Header from './layout/header/Header';
import Footer from './layout/Footer';
import Spinner from './utils/Spinner';
const ProductDetail = lazy(() => import('./components/productView/ProductDetail'));
const CartView = lazy(() => import('./components/cartView/CartView'));
const ShippingInfo = lazy(() => import('./components/placeorder/ShippingInfo'));
const SelectPayment = lazy(() => import('./components/placeorder/SelectPayment'));
const PlaceOrder = lazy(() => import('./components/placeorder/PlaceOrder'));
const OrderView = lazy(() => import('./components/order/OrderView'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Login = lazy(() => import('./components/auth/Login'));
const UserSettings = lazy(() => import('./components/profileView/UserSettings'));
const UserOrder = lazy(() => import('./components/profileView/UserOrders'));

const App = ()=> {
  return (
    <AuthStore>  
     <UserStore>    
      <GlobalStyle />
     <Router>        
     <Suspense fallback = {<Spinner />}>             
     <div className="container">      
     <Header />
      <div className = "content">
         <Route path = '/signup' exact component = {Signup} />
         <Route path = '/login' exact component = {Login} />
      <OrderStore> 
      <CartStore>      
         <PrivateRoute path = '/placeorder' exact component = {PlaceOrder} />
         <PrivateRoute path = '/shipping' exact component = {ShippingInfo} />
         <PrivateRoute path = '/payment' exact component = {SelectPayment} />
         <Route path = '/cart' exact component = {CartView} />
         <ProductStore>
         <ReviewStore>         
         <Route path = '/products/:id' exact component = {ProductDetail} />
         <Route path = '/' exact component = {ProductView} />
         </ReviewStore>
         </ProductStore>
      </CartStore>
         <PrivateRoute path = '/order/:id' exact component = {OrderView} />
         <PrivateRoute path = '/profile/settings' exact component = {UserSettings} />
         <PrivateRoute path = '/profile/orders' exact component = {UserOrder} />         
       </OrderStore>        
      </div>
      <Footer />
    </div> 
    </Suspense>
     </Router>      
     </UserStore>
     </AuthStore>
  );


}

export default App;
