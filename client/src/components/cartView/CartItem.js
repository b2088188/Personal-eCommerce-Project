import React, {useState, useContext} from 'react';
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
    	changeItemQuantity(item._id, +e.target.value);
    }

	return (
     <div className = "cart-view__group">
     			<div className = "cart-view__col--15">
     				<img src = {item.image} alt = {item.name} className = "cart-view__image"/>
     			</div>
     			<div className = "cart-view__col--25">
     				<a href="#" className = "cart-view__link">
     					{item.name}
     				</a>
     			</div>
     			<div className = "cart-view__col--15">
     				${item.price}
     			</div>
     			<div className = "cart-view__col--15">
     				<Select count = {item.countInStock} value = {selectQty}  onChange = {onSelectChange}  />
     			</div>
     			<div className = "cart-view__col--15">
     				<button className = "btn--transparent cart-view__btndelete" onClick = {deleteFromCart(item._id)}>
     					<DeleteIcon fontSize = 'large' />
     				</button>
     			</div>
     		</div>
		)
}

export default CartItem;