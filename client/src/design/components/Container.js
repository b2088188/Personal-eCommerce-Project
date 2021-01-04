import styled from 'styled-components';
import {applyStyleModifiers} from 'styled-components-modifiers';
import {setFlex, setFlexWidth, setMargin} from '../utils';


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
		margin: 2rem auto;
		${setFlex({direction: 'column', x: 'center'})}	  
`;


export const Row = styled.div`
	${setFlex({wrap: 'wrap'})}
	width: 100%;
`;

export const Col = styled.div`
	//Margin
	${({mx}) => mx && setMargin({mx})}
	//Width
	${props => props.col_12 && setFlexWidth({width: '100'})}
	${props => props.col_9 && setFlexWidth({width: '75'})}
	${props => props.col_6 && setFlexWidth()}
	${props => props.col_4 && setFlexWidth({width: '33.2'})}
	${props => props.col_3 && setFlexWidth({width: '25'})}
`
