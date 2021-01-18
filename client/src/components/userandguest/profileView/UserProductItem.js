import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Table, Link as SLink, Icon, Button } from '../../../design/components';
import formatDate from '../../../utils/formatDate';
import { Edit, Delete } from '@material-ui/icons';

const UserProductItem = ({ product }) => {
	const history = useHistory();
	const { url } = useRouteMatch();
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
				<Button modifiers='transparent'>
					<Icon as={Delete} />
				</Button>
			</Table.Td>
		</Table.Tr>
	);
};

export default UserProductItem;
