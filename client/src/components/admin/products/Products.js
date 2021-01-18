import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Title, Table, Button } from '../../../design/components';
import { useProducts } from '../../../stores/product/productsContext';
import ProductItem from './ProductItem';
import AdminSidebar from '../../../layout/admin/AdminSidebar';
import { Spinner, Message } from '../../../design/elements';
import axios from 'axios';

const UserProducts = ({ className }) => {
	const { products, statusProducts, errorProducts, getAllProducts } = useProducts();
	const { url } = useRouteMatch();
	const history = useHistory();

	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);

	function renderUserProducts(list) {
		return list?.map(function generateItem(product) {
			return <ProductItem key={product._id} product={product} />;
		});
	}

	if (statusProducts === 'idle' || statusProducts === 'pending')
		return <Spinner modifiers='dark' />;
	if (statusProducts === 'rejected' && errorProducts)
		return <Message severity='error' text={errorProducts} />;
	if (statusProducts === 'resolved')
		return (
			<>
				<Col width='3'>
					<AdminSidebar />
				</Col>
				<Col width='8' className={className}>
					<div className='tablebox'>
						<div className='products__titlebox'>
							<Title modifiers={['large', 'exlight']}>Products</Title>
							<Button onClick={() => history.push(`${url}/edit`)}>Create Product</Button>
						</div>
						<Table>
							<Table.Head>
								<Table.Tr>
									<Table.Td modifiers='light'>Id</Table.Td>
									<Table.Td modifiers='light'>Name</Table.Td>
									<Table.Td modifiers='light'>Price</Table.Td>
									<Table.Td modifiers='light'>Category</Table.Td>
									<Table.Td modifiers='light'>Brand</Table.Td>
									<th></th>
								</Table.Tr>
							</Table.Head>
							<Table.Body>{renderUserProducts(products)}</Table.Body>
						</Table>
					</div>
				</Col>
			</>
		);
};

export default styled(UserProducts)`
	margin: 2rem 0;
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
