import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';

const Header = () => {
	
	return (
     <header className="header">
     <div className = "header__linkbox">
       <a href="#" className = "header__link header__linkhome">
         eCommerce
       </a>
       <a href="#" className = "header__link header__linkcart">         
       <ShoppingCartIcon />
       <span className = "header__text">Cart</span>
       </a>
       <a href="#" className = "header__link header__signin">         
       <PersonIcon />
       <span className = "header__text">Sign In</span>
       </a>
     </div>
     </header>   
		)
}

export default Header;