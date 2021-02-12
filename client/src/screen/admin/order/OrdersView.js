import React from 'react';
import { useOrderItems } from 'utils/order';
import OrderItem from './OrderItem';
import AdminSidebar from 'layout/admin/AdminSidebar';
import { Row, Col, CenterWrapper, Title } from 'design/components';
import { TableHead, TableRow, TableBody, TableCell, TableContent } from 'components/Table';
import Spinner from 'components/Spinner';

const UserOrder = ({ className }) => {
	const { orders, isIdle, isLoading, isSuccess } = useOrderItems();

	function renderOrders(list) {
		return list.map(function generateItem(order) {
			return <OrderItem key={order._id} order={order} />;
		});
	}

	if (isIdle || isLoading)
		return (
			<Row>
				<Spinner modifiers='dark' />
			</Row>
		);

	if (isSuccess)
		return (
			<Row direction={{ tabport: 'column' }} className={className}>
				<Col width='3'>
					<AdminSidebar />
				</Col>
				<Col width='8'>
					<CenterWrapper width='90' my='2'>
						<Title modifiers={['large', 'exlight']}>Orders</Title>
						<TableContent>
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell>User Id</TableCell>
									<TableCell>User Name</TableCell>
									<TableCell>Date</TableCell>
									<TableCell>TotalPrice</TableCell>
									<TableCell>Paid</TableCell>
									<TableCell>Delivered</TableCell>
									<TableCell> </TableCell>
								</TableRow>
							</TableHead>
							<TableBody>{renderOrders(orders)}</TableBody>
						</TableContent>
					</CenterWrapper>
				</Col>
			</Row>
		);
};

export default UserOrder;
