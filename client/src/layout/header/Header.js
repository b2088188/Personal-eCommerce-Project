import React from 'react';
import {Link} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';

const Header = () => {
	
	return (
     <header className="header">
     <div className = "header__linkbox">
       <Link to = "/" className = "header__link header__linkhome">
         eCommerce
       </Link>
       <Link to = "/cart" className = "header__link header__linkcart">         
       <ShoppingCartIcon />
       <span className = "header__text">Cart</span>
       </Link>
       <Link to = "/login" className = "header__link header__signin">         
       <PersonIcon />
       <span className = "header__text">Sign In</span>
       </Link>
     </div>
     </header>   
		)
}

export default Header;