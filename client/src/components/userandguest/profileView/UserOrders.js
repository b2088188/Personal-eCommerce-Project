import React, { useEffect } from 'react';
import useUser from '../../../stores/user/userContext';
import styled from 'styled-components';
import { Row, Col, CenterWrapper, Title } from '../../../design/components';
import { Spinner, Message } from '../../../design/elements';
import Sidebar from '../../../layout/Sidebar';
import UserOrderItem from './UserOrderItem';
import {
	TableHead,
	TableRow,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer
} from '@material-ui/core';
import axios from 'axios';

const UserOrder = ({ className }) => {
	const [{ userOrders, statusUserOrders, errorUserOrders }, { userOrdersHandle }] = useUser();

	useEffect(() => {
		userOrdersHandle(axios.get('/api/v1/users/orders'));
	}, [userOrdersHandle]);

	function renderUserOrders(list) {
		return list?.map(function generateItem(order) {
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
						<TableContainer component={Paper}>
							<Table aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>Total</TableCell>
										<TableCell>Paid</TableCell>
										<TableCell>Delivered</TableCell>
										<TableCell> </TableCell>
									</TableRow>
								</TableHead>
								<TableBody>{renderUserOrders(userOrders)}</TableBody>
							</Table>
						</TableContainer>
					</CenterWrapper>
				</Col>
			</Row>
		);
};

export default styled(UserOrder)``;
