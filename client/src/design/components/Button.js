import styled from 'styled-components';
import { colorGrey, colorNormal, colorNatural, setBorder } from '../utils';
import { applyStyleModifiers } from 'styled-components-modifiers';

const BUTTON_MODIFIERS = {
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
   transparent: () => `
     background: none;
     color: ${colorGrey.light1};
     padding: 0;
    `,
   disabled: () => `
        background: ${colorGrey.light4};        
        cursor: default;
    `,
   outline: () => `
    background: none;
     color: ${colorGrey.dark1};
    border: solid .1rem currentColor;
    `,
   natural: () => `
    color: ${colorNatural.default};
    border: solid .1rem ${colorNatural.default};
    transition: all .3s;
    &:hover{
      color: ${colorNormal.white};
      background: ${colorNatural.default};
    }
    `
};

export const Button = styled.button`
   background: ${colorGrey.dark1};
   color: ${colorNormal.white};
   text-decoration: none;
   font-size: 1.7rem;
   font-weight: 300;
   padding: 0.75rem 1.25rem;
   border: none;
   cursor: pointer;

   &:focus {
      outline: none;
   }
   ${(props) => props.btop && setBorder({ position: 'border-top' })}
   ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
