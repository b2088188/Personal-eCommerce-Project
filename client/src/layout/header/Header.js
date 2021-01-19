import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import styled from 'styled-components';
import { Wrapper, Span, Link as SLink, Input, Button, Icon } from '../../design/components';
import { colorGrey, media } from '../../design/utils';
import { ShoppingCart, Person, Search } from '@material-ui/icons';
import Menu from '../../utils/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Header = ({ className }) => {
   const [q, setQ] = useState('');
   const [open, setOpen] = useState(false);
   const { user } = useAuthState();
   const { logout } = useAuthActions();
   const history = useHistory();
   const anchorRef = useRef(null);
   function onSearchClick() {
      if (q) history.push(`/search/?q=${q}`);
   }

   return (
      <header className={className}>
         <div className='container'>
            <SLink as={Link} to='/' className='header__link header__link--home' modifiers='exlight'>
               eCommerce
            </SLink>
            <Wrapper direction='row' y='center' className='header__searchbox'>
               <Input
                  type='text'
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className='header__input'
               />
               <Button
                  className='header__button--search'
                  modifiers='transparent'
                  onClick={onSearchClick}
               >
                  <Icon as={Search} className='header__icon--search' modifiers='natural' />
               </Button>
               <Button className='header__button' modifiers='natural' onClick={onSearchClick}>
                  Search
               </Button>
            </Wrapper>
            <SLink as={Link} to='/cart' className='header__link' modifiers='exlight'>
               <Icon as={ShoppingCart} className='header__icon' />
               <Span>Cart</Span>
            </SLink>
            {user ? (
               <>
                  <Button
                     ref={anchorRef}
                     onClick={() => setOpen((prev) => !prev)}
                     modifiers='transparent'
                  >
                     <Icon as={Person} />
                     <Span>{user.name}</Span>
                  </Button>
                  <Menu open={open} setOpen={setOpen} anchorRef={anchorRef}>
                     <MenuItem onClick={() => history.push('/profile/settings')}>Profile</MenuItem>
                     <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
               </>
            ) : (
               <SLink as={Link} to='/login' className='header__link header__link--signin'>
                  <Icon as={Person} className='header__icon' />
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
   ${media.tabport(`
          padding: .5rem 1rem;
          height: 10rem;
            `)}
   .header {
      &__searchbox {
         margin-right: auto;
         margin-left: 1rem;
         ${media.tabport(`
            order: 1;
            flex: 0 0 100%;
            margin-left: 0;
            `)}
      }
      &__link {
         color: ${colorGrey.light1};
         margin-right: 1rem;
         &--home {
            ${media.tabport(`
            margin-right: auto;
            `)}
         }
         &--signin {
            margin-left: 1rem;
         }
      }
      &__input {
         ${media.tabport(`
            flex: 1;
            `)}
      }
      &__button {
         ${media.tabport(`
           display: none;
            `)}
         &--search {
            display: none;
            ${media.tabport(`
          display: inline-block;
          padding: .5rem;
            `)}
         }
      }
      &__icon {
         margin-right: 0.5rem;
      }
   }
   .container {
      width: 70%;
      height: 100%;
      margin: auto;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: 1.7rem;
      ${media.tabport(`
            width: 100%;
            `)}
   }
`;
