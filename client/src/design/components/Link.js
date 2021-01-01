import styled from 'styled-components';
import {colorGrey} from '../utils';
import {applyStyleModifiers} from 'styled-components-modifiers';


const LINK_MODIFIERS = {
  huge: () => `
    font-size: 3rem;
  `,
  big: () => `
    font-size: 2.5rem;
  `,
  large: () => `
    font-size: 2rem;
  `,
  medium: () => `
    font-size: 1.5rem;
  `,
  small: () => `
    font-size: 1rem;
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

export const Link = styled.a`

  color: ${colorGrey.dark1};
  text-transform: uppercase;
  text-decoration: none;		
  ${applyStyleModifiers(LINK_MODIFIERS)}
`;