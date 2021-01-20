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
	margin: 0 auto;
	// margin vertical
	${({ my }) => (my && typeof my === 'string' ? `margin: ${my}rem auto;` : null)}
	${({ my }) => (my && my.desktop ? `margin: ${my.desktop}rem auto;` : null)}
   ${({ my }) => (my && my.tabland ? media.tabland(`margin: ${my.tabland}rem auto;`) : null)}
   ${({ my }) => (my && my.tabport ? media.tabport(`margin: ${my.tabport}rem auto;`) : null)}
   ${({ my }) => (my && my.phone ? media.phone(`margin: ${my.phone}rem auto;`) : null)}
	//Width
	${({ width }) => (width && typeof width === 'string' ? `width: ${width}%;` : null)}
	${({ width }) => (width && width.desktop ? `width: ${width.desktop}%;` : null)}
   ${({ width }) => (width && width.tabland ? media.tabland(`width: ${width.tabland}%;`) : null)}
   ${({ width }) => (width && width.tabport ? media.tabport(`width: ${width.tabport}%;`) : null)}
   ${({ width }) => (width && width.phone ? media.phone(`width: ${width.phone}%;`) : null)}
`;

export const Row = styled.div`
	max-width: 100%;
	min-height: inherit;
	${setFlex({ wrap: 'wrap' })}
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

export const Col = styled.div`
	max-width: 100%;
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
`;

export const CenterWrapper = styled.div`
	margin: 0 auto;
	//margin vertical
	${({ my }) => (my && typeof my === 'string' ? `margin: ${my}rem auto;` : null)}
	${({ my }) => (my && my.desktop ? `margin: ${my.desktop}rem auto;` : null)}
   ${({ my }) => (my && my.tabland ? media.tabland(`margin: ${my.tabland}rem auto;`) : null)}
   ${({ my }) => (my && my.tabport ? media.tabport(`margin: ${my.tabport}rem auto;`) : null)}
   ${({ my }) => (my && my.phone ? media.phone(`margin: ${my.phone}rem auto;`) : null)}
	//Width
	${({ width }) => (width && typeof width === 'string' ? `width: ${width}%;` : null)}
	${({ width }) => (width && width.desktop ? `width: ${width.desktop}%;` : null)}
   ${({ width }) => (width && width.tabland ? media.tabland(`width: ${width.tabland}%;`) : null)}
   ${({ width }) => (width && width.tabport ? media.tabport(`width: ${width.tabport}%;`) : null)}
   ${({ width }) => (width && width.phone ? media.phone(`width: ${width.phone}%;`) : null)}
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

export const ImageContainer = styled.div`
	min-height: 3rem;
	min-width: 3rem;
	//Width
	${({ width }) => (width && typeof width === 'string' ? `width: ${width};` : null)}
	${({ width }) => (width && width.desktop ? `width: ${width.desktop};` : null)}
   ${({ width }) => (width && width.tabland ? media.tabland(`width: ${width.tabland};`) : null)}
   ${({ width }) => (width && width.tabport ? media.tabport(`width: ${width.tabport};`) : null)}
   ${({ width }) => (width && width.phone ? media.phone(`width: ${width.phone};`) : null)}
    // flex-basis
   ${({ flexWidth }) =>
		flexWidth && typeof flexWidth === 'string' ? setFlexWidth({ width: flexWidth }) : null}
   ${({ flexWidth }) =>
		flexWidth && flexWidth.desktop ? setFlexWidth({ width: flexWidth.desktop }) : null}
   ${({ flexWidth }) =>
		flexWidth && flexWidth.tabland
			? media.tabland(setFlexWidth({ width: flexWidth.tabland }))
			: null}
   ${({ flexWidth }) =>
		flexWidth && flexWidth.tabport
			? media.tabport(setFlexWidth({ width: flexWidth.tabport }))
			: null}
   ${({ flexWidth }) =>
		flexWidth && flexWidth.phone ? media.phone(setFlexWidth({ width: flexWidth.phone })) : null}
   //Margin
   ${({ mr }) => (mr && typeof mr === 'string' ? `margin-right: ${mr};` : null)}
   ${({ mr }) => (mr && mr.desktop ? `margin-right: ${mr.desktop};` : null)}
   ${({ mr }) => (mr && mr.tabland ? media.tabland(`margin-right: ${mr.tabland};`) : null)}
   ${({ mr }) => (mr && mr.tabport ? media.tabport(`margin-right: ${mr.tabport};`) : null)}
   ${({ mr }) => (mr && mr.phone ? media.phone(`margin-right: ${mr.phone};`) : null)}
`;

export const Footer = styled.footer`
	text-align: center;
`;
