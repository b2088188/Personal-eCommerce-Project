import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import styled from 'styled-components';
import { Span, Link as SLink } from '../../design/components';
import { colorGrey } from '../../design/utils';
import { ShoppingCart, Person } from '@material-ui/icons';
import Menu from '../../utils/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const AdminHeader = ({ className }) => {
   const { user } = useAuthState();
   const { logout } = useAuthActions();
   const history = useHistory();

   return (
      <header className={className}>
         <div className='container'>
            <SLink as={Link} to='/' className='home'>
               eCommerce
            </SLink>
            <Menu username={user.name}>
               <MenuItem onClick={() => history.push('/')}>Orders</MenuItem>
               <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
         </div>
      </header>
   );
};

export default styled(AdminHeader)`
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

   .icon {
      margin-right: 0.5rem;
   }
`;
