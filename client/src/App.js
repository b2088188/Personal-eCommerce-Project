import './base.scss';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProductStore from './stores/product/ProductStore';
import CartStore from './stores/cart/CartStore';
import Header from './layout/header/Header';
import Footer from './layout/Footer';
import ProductView from './components/productView/ProductView';
import ProductDetail from './components/productView/ProductDetail';
import CartView from './components/cartView/CartView';

const App = ()=> {
  return (
     <ProductStore>
     <CartStore>        
     <Router>        
     <div className="container">      
     <Header />
      <div className = "content">
         <Route path = '/' exact component = {ProductView} />
         <Route path = '/products/:id' exact component = {ProductDetail} />
         <Route path = '/cart' exact component = {CartView} />
      </div>
      <Footer />
    </div> 
     </Router>        
     </CartStore>
     </ProductStore>
  );
}

export default App;
