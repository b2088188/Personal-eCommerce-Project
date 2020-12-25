import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

	
	return (
    <nav className ="sidebar">
       <ul className ="side-nav">
           <li className ="side-nav__item">
               <Link to = '/profile/settings' className = {`side-nav__link ${location.pathname === '/profile/settings' && 'side-nav__link--active'}`}>
                   <span className ="side-nav__text">Settings</span>
               </Link>
           </li>
           <li className ="side-nav__item">
               <Link to = '/profile/orders' className = {`side-nav__link ${location.pathname === '/profile/orders' && 'side-nav__link--active'}`}>
                   <span className ="side-nav__text">My Orders</span>
               </Link>
           </li>
       </ul>
   </nav>    
		)
}

export default Sidebar;