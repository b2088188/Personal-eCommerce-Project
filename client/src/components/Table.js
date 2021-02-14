import {
	TableHead,
	TableRow,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer
} from '@material-ui/core';

const TableContent = ({ children }) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>{children}</Table>
		</TableContainer>
	);
};

export { TableContent, TableHead, TableRow, TableBody, TableCell };
