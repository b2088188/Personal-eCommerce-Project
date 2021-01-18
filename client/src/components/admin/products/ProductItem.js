import React, { useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Wrapper, Table, Link as SLink, Icon, Button, Title } from '../../../design/components';
import formatDate from '../../../utils/formatDate';
import { Edit, Delete } from '@material-ui/icons';
import { Modal } from '../../../design/elements';

const UserProductItem = ({ product }) => {
	const history = useHistory();
	const { url } = useRouteMatch();
	const [open, setOpen] = useState(false);
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
					modifiers='transparent'
				>
					<Icon as={Edit} />
				</Button>
				<Modal
					toggleButton={
						<Button modifiers='transparent' onClick={() => setOpen(true)}>
							<Icon as={Delete} />
						</Button>
					}
					open={open}
					setOpen={setOpen}
				>
					<Wrapper direction='column' y='center'>
						<Title>Confirm this action</Title>
						<Button modifiers='outline'>Delete</Button>
					</Wrapper>
				</Modal>
			</Table.Td>
		</Table.Tr>
	);
};

export default UserProductItem;
