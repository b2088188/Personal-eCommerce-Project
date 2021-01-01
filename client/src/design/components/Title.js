import styled from 'styled-components';
import {applyStyleModifiers} from 'styled-components-modifiers';
import {colorGrey} from '../utils';

const TITLE_MODIFIERS = {
	huge: () => `
		font-size: 3.5rem;
	`,
	big: () => `
		font-size: 3rem;
	`,
	large: () => `
		font-size: 2.5rem;
	`,
	medium: () => `
		font-size: 2rem;
	`,
	small: () => `
		font-size: 1.5rem;
	`,
	bold: () => `
		font-weight: 700
	`,
	regular: () => `
	   font-weight: 500	
	`,
	light: () => `
	  font-weight: 400
	`,
	exlight: () => `
	  font-weight: 300
	`
}

export const Title = styled.h1`
	    color: ${colorGrey.greydark1}; 
	    font-size: 1.7rem;       
        line-height: 1.2;
        ${applyStyleModifiers(TITLE_MODIFIERS)}
`