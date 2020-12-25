import React from 'react';
import {Link} from 'react-router-dom';

const ListItem = ({
	item
}) => {
	
	return (
     <div className = "list-item">
 			<div className = "list-item__col--20 placeorder-view__imgbox">
 				<img src = {item.image} alt = {item.name} className = "placeorder-view__img"/>
 			</div>
 			<div className = "list-item__col--40">
 				<Link to = {`/product/${item._id}`} className = "cart-view__link">
 					{item.name}
 				</Link>
 			</div>
 			<div className = "list-item__col--30">
 			{item.quantity} x ${item.price} = ${item.quantity * item.price} 			
 			</div>
 		</div>
		)
}

export default ListItem;