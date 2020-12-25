import React from 'react';
import {Link} from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import CloseIcon from '@material-ui/icons/Close';

const UserOrderItem = ({
	order
}) => {
	
	return (
		<tr className = 'profile-view__tr'>
			<td className = 'profile-view__td'>{order._id}</td>
			<td className = 'profile-view__td'>{formatDate(order.createdAt)}</td>
			<td className = 'profile-view__td'>{order.totalPrice}</td>
			<td className = 'profile-view__td'>{order.isPaid ? formatDate(order.paidAt) : <CloseIcon />}</td>
			<td className = 'profile-view__td'>{order.isDelivered ? formatDate(order.deliveredAt) : <CloseIcon />}</td>
			<td className = 'profile-view__td'><Link to = '/'>Details</Link></td>
		</tr>
		)
}

export default UserOrderItem;