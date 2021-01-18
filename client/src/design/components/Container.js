import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { setFlex, setFlexWidth, setMargin, media } from '../utils';

const CONTAINER_MODIFIERS = {
	small: () => `
    
  `
};

export const Container = styled.div`
	min-height: 80vh;
	${applyStyleModifiers(CONTAINER_MODIFIERS)}
`;

export const FormContainer = styled.div`
	width: 50%;
	margin: 2rem auto;
	${setFlex({ direction: 'column', x: 'center' })}
`;

export const Row = styled.div`
	${setFlex({ wrap: 'wrap' })}
	min-height: inherit;
`;

export const Col = styled.div`
	//Width
	${({ width }) =>
		width && typeof width === 'string' ? setFlexWidth({ width: Math.ceil(8.33 * width) }) : null}
	${({ width }) =>
		width && width.desktop ? setFlexWidth({ width: Math.ceil(8.33 * width.desktop) }) : null}
   ${({ width }) =>
		width && width.tabland
			? media.tabland(setFlexWidth({ width: Math.ceil(8.33 * width.tabland) }))
			: null}
   ${({ width }) =>
		width && width.tabport
			? media.tabport(setFlexWidth({ width: Math.ceil(8.33 * width.tabport) }))
			: null}
   ${({ width }) =>
		width && width.phone
			? media.phone(setFlexWidth({ width: Math.ceil(8.33 * width.phone) }))
			: null}
			// margin horizontal
    ${({ spacing }) =>
		spacing && typeof spacing === 'string' ? setMargin({ x: `${spacing}%`, y: 0 }) : null}
 ${({ spacing }) =>
		spacing && spacing.desktop ? setMargin({ x: `${spacing.desktop}%`, y: 0 }) : null}
   ${({ spacing }) =>
		spacing && spacing.tabland
			? media.tabland(setMargin({ x: `${spacing.tabland}%`, y: 0 }))
			: null}
   ${({ spacing }) =>
		spacing && spacing.tabport
			? media.tabport(setMargin({ x: `${spacing.tabport}%`, y: 0 }))
			: null}
   ${({ spacing }) =>
		spacing && spacing.phone ? media.phone(setMargin({ x: `${spacing.phone}%`, y: 0 })) : null}

  ${(props) => props.col_12 && setFlexWidth({ width: '100' })}
  ${(props) => props.col_10 && setFlexWidth({ width: '83' })}
  ${(props) => props.col_9 && setFlexWidth({ width: '75' })}
  ${(props) => props.col_6 && setFlexWidth()}
  ${(props) => props.col_4 && setFlexWidth({ width: '33.2' })}
  ${(props) => props.col_3 && setFlexWidth({ width: '25' })}
  ${(props) => props.col_2 && setFlexWidth({ width: '16.6' })}
`;

export const Wrapper = styled.div`
	// align-items
	${({ y }) => (y && typeof y === 'string' ? setFlex({ y }) : null)}
	${({ y }) => (y && y.desktop ? setFlex({ y: y.desktop }) : null)}
   ${({ y }) => (y && y.tabland ? media.tabland(setFlex({ y: y.tabland })) : null)}
   ${({ y }) => (y && y.tabport ? media.tabport(setFlex({ y: y.tabport })) : null)}
   ${({ y }) => (y && y.phone ? media.phone(setFlex({ y: y.phone })) : null)}
   	// flex-direction
	${({ direction }) => (direction && typeof direction === 'string' ? setFlex({ direction }) : null)}
	${({ direction }) =>
		direction && direction.desktop ? setFlex({ direction: direction.desktop }) : null}
   ${({ direction }) =>
		direction && direction.tabland
			? media.tabland(setFlex({ direction: direction.tabland }))
			: null}
   ${({ direction }) =>
		direction && direction.tabport
			? media.tabport(setFlex({ direction: direction.tabport }))
			: null}
   ${({ direction }) =>
		direction && direction.phone ? media.phone(setFlex({ direction: direction.phone })) : null}
`;
