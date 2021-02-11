import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useRemoveProduct } from 'utils/product';
import { Wrapper, Icon, Button, Title } from 'design/components';
import { Edit, Delete } from '@material-ui/icons';
import { TableRow, TableCell } from 'components/Table';
import { Modal, ModalOpenButton, ModalCloseButton, ModalContent } from 'components/Modal';

const ProductItem = ({ product }) => {
	const { remove } = useRemoveProduct(product._id);
	const history = useHistory();
	const { url } = useRouteMatch();

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
				<Modal>
					<ModalOpenButton>
						<Button modifiers={['transparent', 'dark']}>
							<Icon as={Delete} />
						</Button>
					</ModalOpenButton>
					<ModalContent>
						<Wrapper direction='column' y='center'>
							<Title>Confirm this action</Title>
							<ModalCloseButton>
								<Button modifiers='outline' onClick={() => remove()}>
									Delete
								</Button>
							</ModalCloseButton>
						</Wrapper>
					</ModalContent>
				</Modal>
			</TableCell>
		</TableRow>
	);
};

export default ProductItem;
