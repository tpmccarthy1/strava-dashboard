import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    html {
        font-size: 14px;
    }
    @media screen and (min-width: 320px) {
        html {
        font-size: calc(14px + 6 * ((100vw - 320px) / 680));
        }
    }
    @media screen and (min-width: 1000px) {
        html {
        font-size: 20px;
        }
    }
    body {
        font-family: Open-Sans, Helvetica, Sans-Serif;
        padding: 0px;
        margin: 0px;
        background-color: #F5F5F5;
    }
`;

export default GlobalStyle;
