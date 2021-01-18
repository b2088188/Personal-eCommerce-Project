import React from 'react';
import { Link as ReactLink, useLocation, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Settings, FormatListBulleted, Storefront } from '@material-ui/icons';
import { Link, Span, Icon } from '../../design/components';
import { setFlex, setTransition, colorGrey } from '../../design/utils';

const AdminSidebar = ({ className }) => {
   const location = useLocation();

   return (
      <nav className={className}>
         <ul className='list'>
            <li className='item'>
               <Link
                  as={ReactLink}
                  to='/orders'
                  className={`link ${
                     useRouteMatch({ path: '/orders', exact: true }) ? 'active' : ''
                  }`}
                  modifiers={['big', 'exlight']}
               >
                  <Icon as={FormatListBulleted} />
                  <Span>Orders</Span>
               </Link>
            </li>
            <li className='item'>
               <Link
                  as={ReactLink}
                  to='/products'
                  className={`link ${
                     useRouteMatch({ path: '/products', exact: true }) ? 'active' : ''
                  }`}
                  modifiers={['big', 'exlight']}
               >
                  <Icon as={Storefront} />
                  <Span>Products</Span>
               </Link>
            </li>
         </ul>
      </nav>
   );
};

export default styled(AdminSidebar)`
   margin: 2.5rem 0;
   .list {
      ${setFlex({ direction: 'column' })}
   }
   .item {
      width: 100%;
      margin: 1rem auto;
      ${setFlex({ direction: 'column', y: 'center' })}
   }
   .link {
      flex: 0 0 100%;
      color: ${colorGrey.light4};
      ${setTransition()}
      &:hover {
         color: ${colorGrey.dark2};
      }
   }
   .active {
      color: ${colorGrey.dark2};
   }
`;
