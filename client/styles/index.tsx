import {css} from '@emotion/core';

export const globalStyle = css`
    body {
        font-family: 'Open Sans', sans-serif;
        margin: 4rem;
        color: #fff !important;
        background-color: #000;
        font-size: 1.2em;
        text-align: center;
    }

    #app {
        height: 100%;
    }

    * {
        color: #fff;
    }

    html, body {
        height: 100%;
    }
`;

export const containerStyle = css`
    display: flex;
    justify-content: center;
`;

export const titleStyle = css`
    font-size: 6rem;
`;

export const titleCharStyle = css`
    transition: 1s ease;
`;

export const canvasContainerStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const welcomeStyle = css`
    text-align: center;
`;

export const canvasStyle = css`
    border: 2px white solid;
    width: 900px;
    height: 900px;
    @media (max-width: 1025px) {
        width: 700px;
        height: 700px;
    }
    @media (max-width: 769px) {
        width: 400px;
        height: 400px;
    }
    @media (max-width: 400px) {
        width: 200px;
        height: 200px;
    }
`;

export const sidebarStyle = css`
    width: 18em;
    text-align: left;
`;

export const populationListStyle = css`
    list-style: none;
    padding-left: 0;
`;

export const appStyle = css`
    height: 100%;
`;

export const colorNameCss = css`
    font-weight: bold;
    :hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;