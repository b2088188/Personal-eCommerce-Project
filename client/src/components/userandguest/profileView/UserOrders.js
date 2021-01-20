import React, { useEffect } from 'react';
import useUser from '../../../stores/user/userContext';
import styled from 'styled-components';
import { Row, Col, CenterWrapper, Title, Table } from '../../../design/components';
import { Spinner, Message } from '../../../design/elements';
import Sidebar from '../../../layout/Sidebar';
import UserOrderItem from './UserOrderItem';
import axios from 'axios';

const UserOrder = ({ className }) => {
	const [{ userOrders, statusUserOrders, errorUserOrders }, { userOrdersHandle }] = useUser();

	useEffect(() => {
		userOrdersHandle(axios.get('/api/v1/users/orders'));
	}, [userOrdersHandle]);

	function renderUserOrders(list) {
		return list.map(function generateItem(order) {
			return <UserOrderItem key={order._id} order={order} />;
		});
	}

	if (statusUserOrders === 'idle' || statusUserOrders === 'pending')
		return (
			<Row>
				<Spinner />
			</Row>
		);

	if (statusUserOrders === 'rejected' && errorUserOrders)
		return (
			<Row>
				<Message severity='error' text={errorUserOrders} />
			</Row>
		);
	if (statusUserOrders === 'resolved')
		return (
			<Row direction={{ tabport: 'column' }}>
				<Col width='3'>
					<Sidebar />
				</Col>
				<Col width='8'>
					<CenterWrapper width={{ desktop: '70', tabport: '90' }} my='2'>
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
					</CenterWrapper>
				</Col>
			</Row>
		);
};

export default styled(UserOrder)``;
