import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorGrey } from '../utils';

//table
export const Table = styled.table`
	color: ${colorGrey.dark2};
	font-size: 1.7rem;
	font-weight: 300;
	border-collapse: collapse;
	border: solid 0.1rem ${colorGrey.light4};
`;

//tr
const TableTr = styled.tr`
	border-bottom: solid 0.1rem ${colorGrey.light4};
`;
Table.Tr = TableTr;

//td
const TABLETD_MODIFIERS = {
	regular: () => `
     font-weight: 500 
  `,
	light: () => `
    font-weight: 400
  `,
	exlight: () => `
   font-weight: 300
  `
};
const TableTd = styled.td`
	padding: 0.75rem;

	${applyStyleModifiers(TABLETD_MODIFIERS)}
`;
Table.Td = TableTd;

//thead
const TableHead = styled.thead``;
Table.Head = TableHead;

//tbody
const TableBody = styled.tbody``;
Table.Body = TableBody;
