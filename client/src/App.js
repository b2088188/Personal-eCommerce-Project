import React from 'react';
import './base.scss';
import Header from './layout/header/Header';
import Footer from './layout/Footer';
import ProductView from './components/productView/ProductView';

const App = ()=> {
  return (
     <div className="container">      
     <Header />
      <div className = "content">
         <ProductView />
      </div>
      <Footer />
    </div> 
  );
}

export default App;
