import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useProducts } from '../../../stores/product/productsContext';
import { Wrapper, Icon, Button, Title } from '../../../design/components';
import { Edit, Delete } from '@material-ui/icons';
import { TableRow, TableCell } from '@material-ui/core';
import { Modal } from '../../../design/elements';

const ProductItem = ({ product }) => {
	const { deleteProduct } = useProducts();
	const history = useHistory();
	const { url } = useRouteMatch();
	const [open, setOpen] = useState(false);

	function onDeleteClick(productId) {
		return function () {
			deleteProduct(productId);
		};
	}

	return (
		<TableRow>
			<TableCell component='th' scope='row'>
				{product._id}
			</TableCell>
			<TableCell>{product.name}</TableCell>
			<TableCell>{product.price}</TableCell>
			<TableCell>{product.category}</TableCell>
			<TableCell>{product.brand}</TableCell>
			<TableCell>
				<Button
					onClick={() => history.push(`${url}/edit/${product._id}`)}
					modifiers={['transparent', 'dark']}
				>
					<Icon as={Edit} />
				</Button>
				<Modal
					toggleButton={
						<Button modifiers={['transparent', 'dark']} onClick={() => setOpen(true)}>
							<Icon as={Delete} />
						</Button>
					}
					open={open}
					setOpen={setOpen}
				>
					<Wrapper direction='column' y='center'>
						<Title>Confirm this action</Title>
						<Button modifiers='outline' onClick={onDeleteClick(product._id)}>
							Delete
						</Button>
					</Wrapper>
				</Modal>
			</TableCell>
		</TableRow>
	);
};

export default ProductItem;
