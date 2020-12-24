import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const NavSteps = ({
	step1,
	step2,
	step3
}) => {
	const location = useLocation();
	return (
     <div className = 'navsteps'>
     	<div className = 'navsteps__item'>
     		<Link to = {step1 ? '/shipping' : location.pathname} className = {`navsteps__link ${!step1 && 'navsteps__link--disable'}`} >Shipping</Link>
     	</div>
     	<div className = 'navsteps__item'>
     	   <Link to = {step2 ? '/payment' : location.pathname} className = {`navsteps__link ${!step2 && 'navsteps__link--disable'}`}  >Payment</Link>
     	</div>
     	<div className = 'navsteps__item'>
     	    <Link  to = {step3 ? '/placeorder' : location.pathname} className = {`navsteps__link ${!step3 && 'navsteps__link--disable'}`} >Place Order</Link>     		
     	</div>
     </div>
		)
}

export default NavSteps;