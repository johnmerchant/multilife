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
    
    @media (max-width: 768px) {
        body {
            font-size: 1.1em;
            margin: 2rem;
        }
    }
    @media (max-width: 400px) {
        body {
            margin: 2rem;
            font-size: 1em;
        }
    }
`;

export const containerStyle = css`
    display: flex;
    justify-content: center;

    
    @media (max-width: 769px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const titleStyle = css`
    
    font-size: 6rem;
    line-height: 3rem;

    @media (max-width: 769px) {
        font-size: 4rem;
        line-height: 1rem;
    }

    @media (max-width: 400px) {
        font-size: 3rem;
        line-height: 0.8rem;
    }
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
        width: 640px;
        height: 640px;
    }
    @media (max-width: 769px) {
        width: 400px;
        height: 400px;
        order: 0;
    }
    @media (max-width: 400px) {
        width: 300px;
        height: 300px;
    }
`;

export const sidebarStyle = css`
    white-space: nowrap;
    margin-left: 2rem;
    margin-right: 2rem;
    text-align: left;

    @media (max-width: 769px) {
        display: flex;
        justify-content: center;
        text-align: center;
        order:10;
    }
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