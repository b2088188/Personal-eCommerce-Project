import React, { useEffect } from 'react';
import { useUserState } from '../../stores/user/userStateContext';
import { useUserActions } from '../../stores/user/userActionContext';
import styled from 'styled-components';
import { Container, Row, Col, Title, Table } from '../../design/components';
import Sidebar from '../../layout/Sidebar';
import UserOrderItem from './UserOrderItem';
import Spinner from '../../utils/Spinner';
import Message from '../../utils/Message';
import axios from 'axios';

const UserOrder = ({ className }) => {
	const { userOrdersHandle } = useUserActions();
	const { userOrders, statusUserOrders, errorUserOrders } = useUserState();
	useEffect(() => {
		userOrdersHandle(axios.get('/api/v1/users/orders'));
	}, [userOrdersHandle]);

	function renderUserOrders(list) {
		return list.map(function generateItem(order) {
			return <UserOrderItem key={order._id} order={order} />;
		});
	}

	if (statusUserOrders === 'idle' || statusUserOrders === 'pending') return <Spinner />;
	if (statusUserOrders === 'rejected' && errorUserOrders)
		return <Message severity='error' text={errorUserOrders} />;
	if (statusUserOrders === 'resolved')
		return (
			<Container className={className}>
				<Row>
					<Col col_3>
						<Sidebar />
					</Col>
					<Col col_9>
						<div className='tablebox'>
							<Title modifiers={['large', 'exlight']}>My Orders</Title>
							<Table>
								<Table.Tr>
									<Table.Td modifiers='light'>Id</Table.Td>
									<Table.Td modifiers='light'>Date</Table.Td>
									<Table.Td modifiers='light'>Total</Table.Td>
									<Table.Td modifiers='light'>Paid</Table.Td>
									<Table.Td modifiers='light'>Delivered</Table.Td>
									<th></th>
								</Table.Tr>
								<Table.Body>{renderUserOrders(userOrders)}</Table.Body>
							</Table>
						</div>
					</Col>
				</Row>
			</Container>
		);
};

export default styled(UserOrder)`
	&__form {
		width: 70%;
		margin: 2.5rem auto;
	}
	.tablebox {
		width: 70%;
		margin: 2.5rem auto;
	}
`;
