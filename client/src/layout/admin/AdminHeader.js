import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from 'context/auth/authContext';
import styled from 'styled-components';
import { Span, Link as SLink, Button, Icon } from 'design/components';
import { colorGrey } from 'design/utils';
import { Person } from '@material-ui/icons';
import { Menu, MenuItem, MenuOpenButton, MenuContent } from 'components/Menu';

const AdminHeader = ({ className }) => {
   const [{ user }, { logout }] = useAuth();
   const history = useHistory();

   function onNavigationClick(url) {
      return function () {
         history.push(url);
      };
   }

   function onLogoutClick() {
      logout();
   }

   return (
      <header className={className}>
         <div className='container'>
            <SLink as={Link} to='/' className='home'>
               eCommerce
            </SLink>

            <Menu>
               <MenuOpenButton>
                  <Button modifiers='transparent'>
                     <Icon as={Person} />
                     <Span>{user.name}</Span>
                  </Button>
               </MenuOpenButton>
               <MenuContent>
                  <MenuItem onClick={onNavigationClick('/')}>Orders</MenuItem>
                  <MenuItem onClick={onNavigationClick('/products')}>Products</MenuItem>
                  <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
               </MenuContent>
            </Menu>
            <Menu username={user.name}></Menu>
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
