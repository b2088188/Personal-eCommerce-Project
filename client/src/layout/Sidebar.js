import React from 'react';
import {Link as ReactLink, useLocation, useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';
import {Link, Span} from '../design/components';
import {setFlex, setTransition, colorGrey} from '../design/utils';

const Sidebar = ({
    className
}) => {
    const location = useLocation();
	
	return (
    <nav className = {className}>
       <ul className ="list">
           <li className ="item">
               <Link as = {ReactLink} to = '/profile/settings' className = {`link ${useRouteMatch({path: '/profile/settings', exact: true}) ? 'active': ''}`} modifiers = {['big', 'exlight']}>
                   <Span>Settings</Span>
               </Link>
           </li>
           <li className ="item">
               <Link as = {ReactLink} to = '/profile/orders' className = {`link ${useRouteMatch({path: '/profile/orders', exact: true}) ? 'active': ''}`} modifiers = {['big', 'exlight']}>
                   <Span>My Orders</Span>
               </Link>
           </li>
       </ul>
   </nav>    
		)
}



export default styled(Sidebar)`
    margin: 2.5rem 0;
    .list{
        ${setFlex({direction: 'column'})}
    }
    .item{
        width: 100%;
        margin: 1rem auto;
        ${setFlex({direction: 'column', y: 'center'})}
    }
    .link{
        flex: 0 0 100%;
        color: ${colorGrey.light4};
        ${setTransition()}
        &:hover{
            color: ${colorGrey.dark2};
        }
    }
    .active{
        color: ${colorGrey.dark2};
    }
`;