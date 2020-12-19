import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '../../utils/Select';

const CartItem = ({
	product
}) => {
	
	return (
     <div className = "cart-view__group">
     			<div className = "cart-view__col--15">
     				<img src="https://s.yimg.com/zp/MerchandiseImages/E1427C2FC4-SP-8282361.jpg" alt="Image Test" className = "cart-view__image"/>
     			</div>
     			<div className = "cart-view__col--25">
     				<a href="#" className = "cart-view__link">
     					Airpods Wireless Bluetooth Headphones
     				</a>
     			</div>
     			<div className = "cart-view__col--15">
     				$89.99
     			</div>
     			<div className = "cart-view__col--15">
     				<Select count = {2} />
     			</div>
     			<div className = "cart-view__col--15">
     				<button className = "btn--transparent cart-view__btndelete">
     					<DeleteIcon fontSize = 'large' />
     				</button>
     			</div>
     		</div>
		)
}

export default CartItem;