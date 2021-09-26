import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    .react-pdf__Page__textContent {
    z-index: 2;
    }

    .highlights {
    position: absolute; 
    display: block; 
    z-index: 1;
    margin: auto;
    left: 0;
    right: 0;
    }
`;
