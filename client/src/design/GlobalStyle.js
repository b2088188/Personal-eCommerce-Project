import { createGlobalStyle } from 'styled-components';
import { media } from './utils';

const GlobalStyle = createGlobalStyle`
html {
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
    ${media.tabland(`
        font-size: 56.25%;
      `)}
     ${media.tabport(`
        font-size: 50%;
      `)}
}
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: inherit;
}


body {
    box-sizing: border-box;
    font-weight: 400;
    line-height: 1.6;
    min-height: 100vh;
    
}

h1{
    text-transform: uppercase;
    letter-spacing: .3rem;
}
.item-enter {
  opacity: 0;
}
.item-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}
.item-exit {
  opacity: 1;
}
.item-exit-active {
  opacity: 0;
 // transition: opacity 500ms ease-in;
}
`;

export default GlobalStyle;
