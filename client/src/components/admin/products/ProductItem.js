import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useProducts } from '../../../stores/product/productsContext';
import { Wrapper, Table, Link as SLink, Icon, Button, Title } from '../../../design/components';
import formatDate from '../../../utils/formatDate';
import { Edit, Delete } from '@material-ui/icons';
import { Modal } from '../../../design/elements';

const UserProductItem = ({ product }) => {
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
		<Table.Tr>
			<Table.Td>{product._id}</Table.Td>
			<Table.Td>{product.name}</Table.Td>
			<Table.Td>{product.price}</Table.Td>
			<Table.Td>{product.category}</Table.Td>
			<Table.Td>{product.brand}</Table.Td>
			<Table.Td>
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
			</Table.Td>
		</Table.Tr>
	);
};

export default UserProductItem;
