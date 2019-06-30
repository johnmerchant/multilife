import {css} from '@emotion/core';

export const globalStyle = css`
    body {
        font-family: 'Open Sans', sans-serif;
        margin: 4rem;
        color: #fff !important;
        background-color: #000;
        font-size: 1.2em;
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
    height: 100%;
`;

export const canvasContainerStyle = css`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72rem;
`;

export const canvasStyle = css`
    border: 2px white solid;
`;

export const sidebarStyle = css`
    width: 12em;
`;

export const populationListStyle = css`
    list-style: none;
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