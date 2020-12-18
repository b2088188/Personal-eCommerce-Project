import './base.scss';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProductStore from './stores/product/ProductStore';
import Header from './layout/header/Header';
import Footer from './layout/Footer';
import ProductView from './components/productView/ProductView';
import ProductDetail from './components/productView/ProductDetail';

const App = ()=> {
  return (
     <ProductStore>
     <Router>        
     <div className="container">      
     <Header />
      <div className = "content">
         <Route path = '/' exact component = {ProductView} />
         <Route path = '/products/:id' exact component = {ProductDetail} />
      </div>
      <Footer />
    </div> 
     </Router>        
     </ProductStore>
  );
}

export default App;
