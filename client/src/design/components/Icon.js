import styled from 'styled-components';
import { colorPrimary, colorSecondary, colorTertiary, colorNatural } from '../utils';
import { applyStyleModifiers } from 'styled-components-modifiers';

const ICON_MODIFIERS = {
   huge: () => `
        font-size: 8.5rem;
    `,
   big: () => `
        font-size: 6rem;
    `,
   large: () => `
        font-size: 4.5rem;
    `,
   medium: () => `
        font-size: 3rem;
    `,
   small: () => `
        font-size: 1.5rem;
    `,
   primary: () => `
        color: ${colorPrimary.light};
    `,
   secondary: () => `
     color: ${colorSecondary.default};
  `,
   tertiary: () => `
  color: ${colorTertiary.default};
  `,
   natural: () => `
  color: ${colorNatural.default};
  `
};

export const Icon = styled.svg`
   font-size: 1.7rem;
   ${(props) => (props.color ? `color: ${props.color};` : null)}
   ${applyStyleModifiers(ICON_MODIFIERS)}
`;
