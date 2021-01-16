import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Link as SLink } from '../../../design/components';
import formatDate from '../../../utils/formatDate';
import CloseIcon from '@material-ui/icons/Close';

const OrderItem = ({ order }) => {
	return (
		<Table.Tr>
			<Table.Td>{order._id}</Table.Td>
			<Table.Td>{order.user?._id}</Table.Td>
			<Table.Td>{formatDate(order.createdAt)}</Table.Td>
			<Table.Td>{order.totalPrice}</Table.Td>
			<Table.Td>{order.isPaid ? formatDate(order.paidAt) : <CloseIcon />}</Table.Td>
			<Table.Td>{order.isDelivered ? formatDate(order.deliveredAt) : <CloseIcon />}</Table.Td>
			<Table.Td>
				<SLink as={Link} to={`/order/${order._id}`}>
					Details
				</SLink>
			</Table.Td>
		</Table.Tr>
	);
};

export default OrderItem;
