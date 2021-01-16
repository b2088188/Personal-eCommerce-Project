import styled, { css } from 'styled-components';
// 0 - 600px: Phone
// 600 - 900px: Tablet Portrait
// 900 - 1200px: Tablet Landscape
// 1200 - 1800px: Normal styles
// 1800px+: BIg Desktop
const breakpoints = {
   tabland: '75em',
   tabport: '56.25em',
   phone: '37.5em'
};

export const media = Object.keys(breakpoints).reduce((acc, type) => {
   acc[type] = function (args) {
      return css`
         @media (max-width: ${breakpoints[type]}) {
            ${args}
         }
      `;
   };
   return acc;
}, {});
