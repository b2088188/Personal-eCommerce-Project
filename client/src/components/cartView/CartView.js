import './cartview.scss';
import React, {useEffect, useContext} from 'react';
import CartContext from '../../stores/cart/cartContext';
import CartItem from './CartItem';
import Spinner from '../../utils/Spinner';


const CartView = () => {
	const {cartList, getCartList, loading, totalPrice, totalQuantity} = useContext(CartContext);

    useEffect(() => {
      getCartList();
    }, [])

    function renderCartList(list) {
    	return list.map(function generateItem(item) {
    		return <CartItem key = {item._id} item = {item} />
    	})
    }

    if(loading)
    	return <Spinner />

	return (
     <div className = "cart-view">
     	<div className = "cart-view__cartlist">
     		<h1 className = "cart-view__title">Shopping Cart</h1>
     		{renderCartList(cartList)}
     	</div>
     	<div className = "cart-view__info">
     		<div className = "cart-view__totalbox">
     			<h2 className = "cart-view__subtitle">Subtotal ({totalQuantity}) Items</h2>
     			<span className = "cart-view__total">${totalPrice}</span>
     		</div>
     		<button className = "btn--transparent cart-view__btncheckout">
     			Proceed To Check Out
     		</button>
     	</div>
     </div>
		)
}

export default CartView;