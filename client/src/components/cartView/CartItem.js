import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import CartContext from '../../stores/cart/cartContext';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '../../utils/Select';

const CartItem = ({
	item
}) => {
	const {changeItemQuantity, deleteFromCart} = useContext(CartContext);
	const [selectQty, setSelectQty] = useState(item.quantity);	  
	
    function onSelectChange(e) {
    	setSelectQty(e.target.value);
    	changeItemQuantity(item.product, +e.target.value);
    }

	return (
     <div className = "list-item">
     			<div className = "list-item__col--15">
     				<img src = {item.image} alt = {item.name} className = "cart-view__image"/>
     			</div>
     			<div className = "list-item__col--25">
     				<Link to = {`/products/${item.product}`} className = "cart-view__link">
     					{item.name}
     				</Link>
     			</div>
     			<div className = "list-item__col--15">
     				${item.price}
     			</div>
     			<div className = "list-item__col--15">
     				<Select count = {item.countInStock} value = {selectQty}  onChange = {onSelectChange}  />
     			</div>
     			<div className = "list-item__col--15">
     				<button className = "btn--transparent cart-view__btndelete" onClick = {deleteFromCart(item.product)}>
     					<DeleteIcon fontSize = 'large' />
     				</button>
     			</div>
     		</div>
		)
}

export default CartItem;