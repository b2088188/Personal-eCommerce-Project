import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useOrderState } from '../../../stores/order/orderStateContext';
import { useOrderActions } from '../../../stores/order/orderActionContext';
import OrderItem from './OrderItem';
import { Row, Col, Title, Table } from '../../../design/components';
import { Spinner } from '../../../design/elements';
import Message from '../../../utils/Message';

const UserOrder = ({ className }) => {
	const { orderList, statusAllOrders, errorAllOrders } = useOrderState();
	const { getAllOrders } = useOrderActions();
	useEffect(() => {
		getAllOrders();
	}, [getAllOrders]);

	function renderUserOrders(list) {
		return list.map(function generateItem(order) {
			return <OrderItem key={order._id} order={order} />;
		});
	}

	if (statusAllOrders === 'idle' || statusAllOrders === 'pending') return <Spinner />;
	if (statusAllOrders === 'rejected' && errorAllOrders)
		return <Message severity='error' text={errorAllOrders} />;
	if (statusAllOrders === 'resolved')
		return (
			<Col width='12' className={className}>
				<div className='tablebox'>
					<Title modifiers={['large', 'exlight']}>All User Orders</Title>
					<Table>
						<Table.Tr>
							<Table.Td modifiers='light'>Id</Table.Td>
							<Table.Td modifiers='light'>User</Table.Td>
							<Table.Td modifiers='light'>Date</Table.Td>
							<Table.Td modifiers='light'>TotalPrice</Table.Td>
							<Table.Td modifiers='light'>Paid</Table.Td>
							<Table.Td modifiers='light'>Delivered</Table.Td>
							<th></th>
						</Table.Tr>
						<Table.Body>{renderUserOrders(orderList)}</Table.Body>
					</Table>
				</div>
			</Col>
		);
};

export default styled(UserOrder)`
	.tablebox {
		width: 70%;
		margin: 2.5rem auto;
	}
	&__form {
		width: 70%;
		margin: 2.5rem auto;
	}
`;
