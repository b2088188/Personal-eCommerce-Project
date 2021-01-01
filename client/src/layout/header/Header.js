import React, {useContext} from 'react';
import styled from 'styled-components';
import {Span, Link} from '../../design/components';
import {colorGrey} from '../../design/utils';
import {Link as ReactLink, useHistory} from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '../../utils/Menu';

const Header = ({
  className
}) => {
	const {isAuth} = useContext(AuthContext);
  let history = useHistory();
	return (
     <header className = {className}>
     <div className = "container">
       <Link as = {ReactLink}  to = '/' className = "home">
         eCommerce
       </Link>
       <Link as = {ReactLink} to = "/cart" className = "cart">         
       <ShoppingCartIcon />
       <Header.Span>Cart</Header.Span>
       </Link>
       {isAuth ? 
       (<Menu history = {history} />) : 
       (<Link as = {ReactLink} to = "/login" className = "signin">         
             <PersonIcon />
             <Header.Span>Sign In</Header.Span>
       </Link>)}    
     </div>
     </header>   
		)
}

export default styled(Header)`
  background: ${colorGrey.dark1};
  height: 7rem;

    .container {
        width: 70%;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        font-size: 1.7rem;
    }


    .home {
        color: #fff;
        margin-right: auto;
        font-weight: 300;
    }

    .cart {
        color: var(--color-grey-light-4);

        &:hover {
            color: #fff;
        }
    }

    .signin {
        margin-left: 1rem;
        color: var(--color-grey-light-4);

        &:hover {
            color: #fff;
        }
    }
`;

const HeaderSpan = styled(Span)`
      margin-left: .5rem;
`;
Header.Span = HeaderSpan;