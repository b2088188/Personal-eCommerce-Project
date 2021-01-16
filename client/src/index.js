import React from 'react';
import ReactDOM from 'react-dom';
import AuthStore from './stores/auth/AuthStore';
import App from './App';

ReactDOM.render(
   <React.StrictMode>
      <AuthStore>
         <App />
      </AuthStore>
   </React.StrictMode>,
   document.getElementById('root')
);
