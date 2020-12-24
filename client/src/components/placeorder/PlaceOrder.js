import './placeorder.scss';
import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import CartContext from '../../stores/cart/cartContext';
import OrderContext from '../../stores/order/orderContext';
import ListGroup from '../../utils/list/ListGroup';
import Navsteps from '../../layout/NavSteps';
import PlaceOrderItem from './PlaceOrderItem';


const PlaceOrder = ({
	history
}) => {
	const {cartList, itemsPrice, shippingPrice, totalPrice, shippingAddress, paymentMethod} = useContext(CartContext);
	const {currentOrder, createStatus, createOrder} = useContext(OrderContext);

    useEffect(() => {
      if(createStatus === 'success')
      	history.push(`/order/${currentOrder._id}`)
    }, [createStatus])

	function createOrderHandle(e) {
		createOrder({
			orderItems: cartList,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice
		})
	}

    function renderPlaceOrderItem(list) {
    	return list.map(function generateItem(item) {
    		return <PlaceOrderItem key = {item.product} item = {item} />
    	})
    }

	return (
    <div className = 'placeorder-view'>
    	<div>
    		<Navsteps step1 step2 step3 />
    	</div>
    	<div className = 'placeorder-view__container'>
    		<div className = 'placeorder-view__info'>
    			<ListGroup title = 'Shipping' info = {`Address: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`} />
    			<ListGroup title = 'Payment Method' info = {`Method: ${paymentMethod}`} />
    			 <div className = 'list-group'>
					<h2 className = 'list-group__title'>Order Items</h2>
					{renderPlaceOrderItem(cartList)}
				</div>
    		</div>
    		<div className = 'placeorder-view__summary'>
    		    <div className = "list-item__col--full">    		    	
    		    <h2 className = 'list-group__title placeorder-view__summarytitle'>Order Summary</h2>
    		    </div>
    			<div className = "list-item placeorder-view__summarybox">
      				<div className = "list-item__col--45">Items</div>
      				<span className = "list-item__col--45">${itemsPrice}</span>
      			</div>
      			<div className = "list-item placeorder-view__summarybox">
      				<div className = "list-item__col--45">Shipping</div>
      				<span className = "list-item__col--45">${shippingPrice}</span>
      			</div>
      			<div className = "list-item placeorder-view__summarybox">
      				<div className = "list-item__col--45">Total</div>
      				<span className = "list-item__col--45">${totalPrice}</span>
      			</div>
      			<div className = "list-item__col--full placeorder-view__summarybox">
      				<button className = 'btn--default placeorder-view__btnorder' onClick = {createOrderHandle}>
      					Place Order
      				</button>
      			</div>
    		</div>
    	</div>
    </div>
		)
}

export default PlaceOrder;