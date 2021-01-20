import React, { useEffect } from 'react';
import useOrder from '../../../stores/order/orderContext';
import OrderItem from './OrderItem';
import AdminSidebar from '../../../layout/admin/AdminSidebar';
import { Row, Col, CenterWrapper, Title } from '../../../design/components';
import {
	TableHead,
	TableRow,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer
} from '@material-ui/core';
import { Spinner, Message } from '../../../design/elements';

const UserOrder = ({ className }) => {
	const [{ orderList, statusAllOrders, errorAllOrders }, { getAllOrders }] = useOrder();
	useEffect(() => {
		getAllOrders();
	}, [getAllOrders]);

	function renderOrders(list) {
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
					<CenterWrapper width='90' my='2'>
						<Title modifiers={['large', 'exlight']}>Orders</Title>
						<TableContainer component={Paper}>
							<Table aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell>User</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>TotalPrice</TableCell>
										<TableCell>Paid</TableCell>
										<TableCell>Delivered</TableCell>
										<TableCell> </TableCell>
									</TableRow>
								</TableHead>
								<TableBody>{renderOrders(orderList)}</TableBody>
							</Table>
						</TableContainer>
					</CenterWrapper>
				</Col>
			</Row>
		);
};

export default UserOrder;
