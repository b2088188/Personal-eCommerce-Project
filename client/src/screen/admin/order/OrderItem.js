import React from 'react';
import { Link } from 'react-router-dom';
import { Link as SLink, Icon } from 'design/components';
import formatDate from 'utils/formatDate';
import { TableRow, TableCell } from 'components/Table';
import { Close } from '@material-ui/icons';

const OrderItem = ({ order }) => {
	return (
		<TableRow>
			<TableCell component='th' scope='row'>
				{order._id}
			</TableCell>
			<TableCell>{order.user._id}</TableCell>
			<TableCell>{order.user.name}</TableCell>
			<TableCell>{formatDate(order.createdAt)}</TableCell>
			<TableCell>{order.totalPrice}</TableCell>
			<TableCell>{order.isPaid ? formatDate(order.paidAt) : <Icon as={Close} />}</TableCell>
			<TableCell>
				{order.isDelivered ? formatDate(order.deliveredAt) : <Icon as={Close} />}
			</TableCell>
			<TableCell>
				<SLink as={Link} to={`/orders/${order._id}`}>
					Details
				</SLink>
			</TableCell>
		</TableRow>
	);
};

export default OrderItem;
