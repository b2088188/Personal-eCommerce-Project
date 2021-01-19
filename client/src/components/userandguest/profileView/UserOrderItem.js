import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Link as SLink, Icon } from '../../../design/components';
import formatDate from '../../../utils/formatDate';
import { Close } from '@material-ui/icons';

const UserOrderItem = ({ order }) => {
	return (
		<Table.Tr>
			<Table.Td>{order._id}</Table.Td>
			<Table.Td>{formatDate(order.createdAt)}</Table.Td>
			<Table.Td>{order.totalPrice}</Table.Td>
			<Table.Td>{order.isPaid ? formatDate(order.paidAt) : <Icon as={Close} />}</Table.Td>
			<Table.Td>
				{order.isDelivered ? formatDate(order.deliveredAt) : <Icon as={Close} />}
			</Table.Td>
			<Table.Td>
				<SLink as={Link} to={`/order/${order._id}`}>
					Details
				</SLink>
			</Table.Td>
		</Table.Tr>
	);
};

export default UserOrderItem;
