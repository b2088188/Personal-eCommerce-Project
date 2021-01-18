import styled from 'styled-components';
import { colorGrey, colorNormal, setBorder } from '../utils';
import { applyStyleModifiers } from 'styled-components-modifiers';

const BUTTON_MODIFIERS = {
   full: () => `
    width: 100%;
    height: 100%;
    `,
   transparent: () => `
     background: none;
     color: ${colorGrey.dark1};
    `,
   disabled: () => `
        background: ${colorGrey.light4};        
        cursor: not-allowed;
    `,
   outline: () => `
    background: none;
     color: ${colorGrey.dark1};
    border: solid .1rem currentColor;
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