import React from 'react';
import './base.scss';
import ProductStore from './stores/product/ProductStore';
import Header from './layout/header/Header';
import Footer from './layout/Footer';
import ProductView from './components/productView/ProductView';

const App = ()=> {
  return (
     <ProductStore>        
     <div className="container">      
     <Header />
      <div className = "content">
         <ProductView />
      </div>
      <Footer />
    </div> 
     </ProductStore>
  );
}

export default App;
