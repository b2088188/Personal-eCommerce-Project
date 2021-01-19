import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

//table
export const Table = styled.table`
	table-layout: auto;
	width: 100%;
	color: var(--color-grey-dark-2);
	font-size: 1.7rem;
	font-weight: 300;
	border-collapse: collapse;
	border: solid 0.1rem var(--color-grey-light-4);
`;

//tr
const TableTr = styled.tr`
	border-bottom: solid 0.1rem var(--color-grey-light-4);
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
