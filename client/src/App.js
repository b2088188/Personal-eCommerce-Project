import './base.scss';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthStore from './stores/auth/AuthStore';
import UserStore from './stores/user/UserStore';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import OrderStore from './stores/order/OrderStore';
import PrivateRoute from './routes/PrivateRoutes';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Header from './layout/header/Header';
import Footer from './layout/Footer';
import ProductView from './components/productView/ProductView';
import ProductDetail from './components/productView/ProductDetail';
import CartView from './components/cartView/CartView';
import ProfileView from './components/profileView/ProfileView';
import ShippingInfo from './components/placeorder/ShippingInfo';
import SelectPayment from './components/placeorder/SelectPayment';
import PlaceOrder from './components/placeorder/PlaceOrder';

const App = ()=> {
  return (
     <AuthStore>        
     <UserStore>        
     <ProductStore>
     <CartStore>
     <OrderStore>        
     <Router>        
     <div className="container">      
     <Header />
      <div className = "content">
         <Route path = '/placeorder' exact component = {PlaceOrder} />
         <Route path = '/shipping' exact component = {ShippingInfo} />
         <Route path = '/payment' exact component = {SelectPayment} />
         <PrivateRoute path = '/profile' exact component = {ProfileView} />
         <Route path = '/signup' exact component = {Signup} />
         <Route path = '/login' exact component = {Login} />
         <Route path = '/products/:id' exact component = {ProductDetail} />
         <Route path = '/cart' exact component = {CartView} />
         <Route path = '/' exact component = {ProductView} />
      </div>
      <Footer />
    </div> 
     </Router>        
     </OrderStore>        
     </CartStore>
     </ProductStore>
     </UserStore>
     </AuthStore>
  );
}

export default App;
