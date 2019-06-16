import {css} from '@emotion/core';

export const globalStyle = css`
    body {
        font-family: 'Open Sans', sans-serif;
        margin: 4rem;
        color: #fff !important;
        background-color: #000;
        font-size: 1.2em;
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
`;

export const canvasContainerStyle = css`
    flex-grow: 2;
    border: 1px #000 solid;
`;

export const sidebarStyle = css`
    width: 12em;
`;

export const populationListStyle = css`
    list-style: none;
`;