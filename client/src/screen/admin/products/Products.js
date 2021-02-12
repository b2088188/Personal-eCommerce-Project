import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, CenterWrapper, Title, Button } from 'design/components';
import { useProductItems } from 'utils/product';
import ProductItem from './ProductItem';
import AdminSidebar from 'layout/admin/AdminSidebar';
import Spinner from 'components/Spinner';
import { TableContent, TableHead, TableRow, TableBody, TableCell } from 'components/Table';

const UserProducts = ({ className }) => {
	const { products, isIdle, isLoading, isSuccess } = useProductItems();
	const { url } = useRouteMatch();
	const history = useHistory();

	function renderProducts(list) {
		return list?.map(function generateItem(product) {
			return <ProductItem key={product._id} product={product} />;
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
					<CenterWrapper width={{ desktop: '70', tabport: '90' }} my='2.5'>
						<div className='products__titlebox'>
							<Title modifiers={['large', 'exlight']}>Products</Title>
							<Button onClick={() => history.push(`${url}/edit`)}>Create Product</Button>
						</div>
						<TableContent>
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
						</TableContent>
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
