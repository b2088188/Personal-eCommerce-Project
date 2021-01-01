import styled from 'styled-components';
import {applyStyleModifiers} from 'styled-components-modifiers';
import {setFlex} from '../utils';


const CONTAINER_MODIFIERS = {
  small: () => `
    
  `

}

export const Container = styled.div`
	min-height: 80vh;
	 ${applyStyleModifiers(CONTAINER_MODIFIERS)}
`

export const FormContainer = styled.div`
		width: 50%;
		margin: 0 auto;
		${setFlex({direction: 'column', x: 'center'})}	  
`;
