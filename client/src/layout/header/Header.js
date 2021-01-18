import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import styled from 'styled-components';
import { Wrapper, Span, Link as SLink, Input, Button } from '../../design/components';
import { colorGrey } from '../../design/utils';
import { ShoppingCart, Person } from '@material-ui/icons';
import Menu from '../../utils/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Header = ({ className }) => {
   const [q, setQ] = useState('');
   const { user } = useAuthState();
   const { logout } = useAuthActions();
   const history = useHistory();
   function onSearchClick() {
      if (q) history.push(`/search/?q=${q}`);
   }

   return (
      <header className={className}>
         <div className='container'>
            <SLink as={Link} to='/' className='header__link' modifiers='exlight'>
               eCommerce
            </SLink>
            <Wrapper direction='row' y='center' className='header__searchbox'>
               <Input type='text' value={q} onChange={(e) => setQ(e.target.value)} />
               <Button modifiers='natural' onClick={onSearchClick}>
                  Search
               </Button>
            </Wrapper>
            <SLink as={Link} to='/cart' className='header__link' modifiers='exlight'>
               <ShoppingCart className='icon' />
               <Span>Cart</Span>
            </SLink>
            {user ? (
               <Menu username={user.name}>
                  <MenuItem onClick={() => history.push('/profile/settings')}>Profile</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
               </Menu>
            ) : (
               <SLink as={Link} to='/login' className='signin'>
                  <Person className='icon' />
                  <Span>Sign In</Span>
               </SLink>
            )}
         </div>
      </header>
   );
};

export default styled(Header)`
   background: ${colorGrey.dark1};
   height: 7rem;
   .header {
      &__searchbox {
         margin-right: auto;
         margin-left: 1rem;
      }
      &__link {
         color: var(--color-grey-light-1);
      }
   }
   .container {
      width: 70%;
      height: 100%;
      margin: auto;
      display: flex;
      align-items: center;
      font-size: 1.7rem;
   }

   .signin {
      margin-left: 1rem;
      color: var(--color-grey-light-4);

      &:hover {
         color: #fff;
      }
   }

   .icon {
      margin-right: 0.5rem;
   }
`;
