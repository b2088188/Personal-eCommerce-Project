import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Settings, FormatListBulleted } from '@material-ui/icons';
import { Link as SLink, Span, Icon, List } from '../design/components';
import { setTransition, colorGrey, media } from '../design/utils';

const Sidebar = ({ className }) => {
   return (
      <nav className={className}>
         <List direction={{ tabport: 'row' }} flexx={{ tabport: 'center' }}>
            <List.Item className='sidebar__item'>
               <SLink
                  as={Link}
                  to='/profile/settings'
                  className={`sidebar__link ${
                     useRouteMatch({ path: '/profile/settings', exact: true })
                        ? 'sidebar__link--active'
                        : ''
                  }`}
                  modifiers={['big', 'exlight']}
               >
                  <Icon as={Settings} className='sidebar__icon' />
                  <Span>Settings</Span>
               </SLink>
            </List.Item>
            <List.Item className='sidebar__item'>
               <SLink
                  as={Link}
                  to='/profile/orders'
                  className={`sidebar__link ${
                     useRouteMatch({ path: '/profile/orders', exact: true })
                        ? 'sidebar__link--active'
                        : ''
                  }`}
                  modifiers={['big', 'exlight']}
               >
                  <Icon as={FormatListBulleted} className='sidebar__icon' />
                  <Span>My Orders</Span>
               </SLink>
            </List.Item>
         </List>
      </nav>
   );
};

export default styled(Sidebar)`
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
