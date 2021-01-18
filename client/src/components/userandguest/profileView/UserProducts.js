import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Title, Table, Button } from '../../../design/components';
import { useAuthState } from '../../../stores/auth/authStateContext';
import { useUserState } from '../../../stores/user/userStateContext';
import { useUserActions } from '../../../stores/user/userActionContext';
import Sidebar from '../../../layout/Sidebar';
import UserProductItem from './UserProductItem';
import { Spinner, Message } from '../../../design/elements';
import axios from 'axios';

const UserProducts = ({ className }) => {
	const { user } = useAuthState();
	const { userProducts, statusUserProducts, errorUserProducts } = useUserState();
	const { getUserProducts } = useUserActions();
	const { url } = useRouteMatch();
	const history = useHistory();

	useEffect(() => {
		if (user) getUserProducts(user._id);
	}, [getUserProducts, user]);

	function renderUserProducts(list) {
		return list?.map(function generateItem(product) {
			return <UserProductItem key={product._id} product={product} />;
		});
	}

	if (statusUserProducts === 'idle' || statusUserProducts === 'pending')
		return <Spinner modifiers='dark' />;
	if (statusUserProducts === 'rejected' && errorUserProducts)
		return <Message severity='error' text={errorUserProducts} />;
	if (statusUserProducts === 'resolved')
		return (
			<>
				<Col width='3'>
					<Sidebar />
				</Col>
				<Col width='8' className={className}>
					<div className='tablebox'>
						<div className='products__titlebox'>
							<Title modifiers={['large', 'exlight']}>My Products</Title>
							<Button onClick={() => history.push(`${url}/edit`)}>Create Product</Button>
						</div>
						<Table>
							<Table.Tr>
								<Table.Td modifiers='light'>Id</Table.Td>
								<Table.Td modifiers='light'>Name</Table.Td>
								<Table.Td modifiers='light'>Price</Table.Td>
								<Table.Td modifiers='light'>Category</Table.Td>
								<Table.Td modifiers='light'>Brand</Table.Td>
								<th></th>
							</Table.Tr>
							<Table.Body>{renderUserProducts(userProducts)}</Table.Body>
						</Table>
					</div>
				</Col>
			</>
		);
};

export default styled(UserProducts)`
	&__form {
		width: 70%;
		margin: 2.5rem auto;
	}
	.tablebox {
		width: 70%;
		margin: 2.5rem auto;
	}
	.products {
		&__titlebox {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1rem;
		}
	}
`;
