import './cartview.scss';
import React from 'react';
import CartItem from './CartItem';


const CartView = () => {
	
	return (
     <div className = "cart-view">
     	<div className = "cart-view__cartlist">
     		<h1 className = "cart-view__title">Shopping Cart</h1>
     		<CartItem />
     	</div>
     	<div className = "cart-view__info">
     		<div className = "cart-view__totalbox">
     			<h2 className = "cart-view__subtitle">Subtotal (1) Items</h2>
     			<span className = "cart-view__total">$89.99</span>
     		</div>
     		<button className = "btn--transparent cart-view__btncheckout">
     			Proceed To Check Out
     		</button>
     	</div>
     </div>
		)
}

export default CartView;