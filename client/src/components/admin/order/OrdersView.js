import React, { useEffect } from 'react';
import styled from 'styled-components';
import useOrder from '../../../stores/order/orderContext';
import OrderItem from './OrderItem';
import AdminSidebar from '../../../layout/admin/AdminSidebar';
import { Row, Col, CenterWrapper, Title, Table } from '../../../design/components';
import { Spinner, Message } from '../../../design/elements';

const UserOrder = ({ className }) => {
	const [{ orderList, statusAllOrders, errorAllOrders }, { getAllOrders }] = useOrder();
	useEffect(() => {
		getAllOrders();
	}, [getAllOrders]);

	function renderUserOrders(list) {
		return list.map(function generateItem(order) {
			return <OrderItem key={order._id} order={order} />;
		});
	}

	if (statusAllOrders === 'idle' || statusAllOrders === 'pending')
		return (
			<Row>
				<Spinner modifiers='dark' />
			</Row>
		);
	if (statusAllOrders === 'rejected' && errorAllOrders)
		return (
			<Row>
				<Message severity='error' text={errorAllOrders} />
			</Row>
		);
	if (statusAllOrders === 'resolved')
		return (
			<Row direction={{ tabport: 'column' }} className={className}>
				<Col width='3'>
					<AdminSidebar />
				</Col>
				<Col width='8'>
					<CenterWrapper width={{ desktop: '100', tabport: '90' }} my='2'>
						<Title modifiers={['large', 'exlight']}>Orders</Title>
						<Table>
							<Table.Head>
								<Table.Tr>
									<Table.Td modifiers='light'>Id</Table.Td>
									<Table.Td modifiers='light'>User</Table.Td>
									<Table.Td modifiers='light'>Date</Table.Td>
									<Table.Td modifiers='light'>TotalPrice</Table.Td>
									<Table.Td modifiers='light'>Paid</Table.Td>
									<Table.Td modifiers='light'>Delivered</Table.Td>
									<th></th>
								</Table.Tr>
							</Table.Head>
							<Table.Body>{renderUserOrders(orderList)}</Table.Body>
						</Table>
					</CenterWrapper>
				</Col>
			</Row>
		);
};

export default styled(UserOrder)``;
