import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, CenterWrapper, Title, Button } from '../../../design/components';
import { useProducts } from '../../../stores/product/productsContext';
import ProductItem from './ProductItem';
import AdminSidebar from '../../../layout/admin/AdminSidebar';
import { Spinner, Message } from '../../../design/elements';
import {
	TableHead,
	TableRow,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer
} from '@material-ui/core';

const UserProducts = ({ className }) => {
	const { products, statusProducts, errorProducts, getFilteredProducts } = useProducts();
	const { url } = useRouteMatch();
	const history = useHistory();

	useEffect(() => {
		getFilteredProducts();
	}, [getFilteredProducts]);

	function renderProducts(list) {
		return list?.map(function generateItem(product) {
			return <ProductItem key={product._id} product={product} />;
		});
	}

	if (statusProducts === 'idle' || statusProducts === 'pending')
		return (
			<Row>
				<Spinner modifiers='dark' />
			</Row>
		);
	if (statusProducts === 'rejected' && errorProducts)
		return (
			<Row>
				<Message severity='error' text={errorProducts} />
			</Row>
		);
	if (statusProducts === 'resolved')
		return (
			<Row direction={{ tabport: 'column' }} className={className}>
				<Col width='3'>
					<AdminSidebar />
				</Col>
				<Col width='8'>
					<CenterWrapper width={{ desktop: '70', tabport: '90' }} my='2.5'>
						<div className='products__titlebox'>
							<Title modifiers={['large', 'exlight']}>Products</Title>
							<Button onClick={() => history.push(`${url}/edit`)}>Create Product</Button>
						</div>
						<TableContainer component={Paper}>
							<Table aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Price</TableCell>
										<TableCell>Category</TableCell>
										<TableCell>Brand</TableCell>
										<TableCell> </TableCell>
									</TableRow>
								</TableHead>
								<TableBody>{renderProducts(products)}</TableBody>
							</Table>
						</TableContainer>
					</CenterWrapper>
				</Col>
			</Row>
		);
};

export default styled(UserProducts)`
	.products {
		&__titlebox {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1rem;
		}
	}
`;
