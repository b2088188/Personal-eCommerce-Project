import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
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
`;

export default GlobalStyle;