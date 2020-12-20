import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '../../utils/Menu';

const Header = () => {
	const {isAuth} = useContext(AuthContext);
  let history = useHistory();
	return (
     <header className="header">
     <div className = "header__linkbox">
       <Link to = "/" className = "link--default header__linkhome">
         eCommerce
       </Link>
       <Link to = "/cart" className = "link--default header__linkcart">         
       <ShoppingCartIcon />
       <span className = "header__text">Cart</span>
       </Link>
       {isAuth ? 
        (<Menu history = {history} />) : (<Link to = "/login" className = "link--default header__signin">         
                                   <PersonIcon />
                                   <span className = "header__text">Sign In</span>
                                 </Link>)}    
     </div>
     </header>   
		)
}

export default Header;

