import React from 'react';
import {Link as ReactLink} from 'react-router-dom';
import {Table, Link} from '../../design/components';
import formatDate from '../../utils/formatDate';
import CloseIcon from '@material-ui/icons/Close';

const UserOrderItem = ({
	order
}) => {
	
	return (
		<Table.Tr>
			<Table.Td>{order._id}</Table.Td>
			<Table.Td>{formatDate(order.createdAt)}</Table.Td>
			<Table.Td>{order.totalPrice}</Table.Td>
			<Table.Td>{order.isPaid ? formatDate(order.paidAt) : <CloseIcon />}</Table.Td>
			<Table.Td>{order.isDelivered ? formatDate(order.deliveredAt) : <CloseIcon />}</Table.Td>
			<Table.Td><Link as = {ReactLink} to = '/'>Details</Link></Table.Td>
		</Table.Tr>
		)
}

export default UserOrderItem;