import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Settings, FormatListBulleted, Storefront } from '@material-ui/icons';
import { Link as SLink, Span, Icon, List } from '../../design/components';
import { setFlex, setTransition, colorGrey, media } from '../../design/utils';

const AdminSidebar = ({ className }) => {
   const location = useLocation();

   return (
      <nav className={className}>
         <List direction={{ tabport: 'row' }} flexx={{ tabport: 'center' }}>
            <List.Item className='sidebar__item'>
               <SLink
                  as={Link}
                  to='/'
                  className={`sidebar__link ${
                     useRouteMatch({ path: '/', exact: true }) ? 'sidebar__link--active' : ''
                  }`}
                  modifiers={['big', 'exlight']}
               >
                  <Icon as={FormatListBulleted} className='sidebar__icon' />
                  <Span>Orders</Span>
               </SLink>
            </List.Item>
            <List.Item className='sidebar__item'>
               <SLink
                  as={Link}
                  to='/products'
                  className={`sidebar__link ${
                     useRouteMatch({ path: '/products', exact: true })
                        ? 'sidebar__link--active'
                        : ''
                  }`}
                  modifiers={['big', 'exlight']}
               >
                  <Icon as={Storefront} className='sidebar__icon' />
                  <Span>Products</Span>
               </SLink>
            </List.Item>
         </List>
      </nav>
   );
};

export default styled(AdminSidebar)`
   margin: 2.5rem 0;
   .sidebar {
      &__item {
         ${media.tabport(`
            margin: 0 1rem;
            `)}
      }
      &__link {
         width: 100%;
         color: ${colorGrey.light4};
         display: flex;
         justify-content: center;
         align-items: center;
         ${setTransition()}
         &:hover {
            color: ${colorGrey.dark2};
         }
         &--active {
            color: ${colorGrey.dark2};
         }
      }
      &__icon {
         margin-right: 0.5rem;
      }
   }
`;
