/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import React from 'react'
import {createStore, applyMiddleware} from 'redux';
import {reducer} from '../reducers';
import {Provider} from 'react-redux';
import createMiddleware  from '@giantmachines/redux-websocket';
import {WebSocketConnection} from './WebSocketConnection';
import { Game } from './Game';
import { Colors } from './Colors';
import { globalStyle, containerStyle, sidebarStyle } from '../styles';
import GithubCorner from 'react-github-corner';

const store = createStore(
    reducer,
    applyMiddleware(createMiddleware())
);

const socketUrl = `${window.location.protocol === 'https' ? 'wss' : 'ws'}://${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : '' }/`;

export const App = () => <React.Fragment>
    <Global styles={globalStyle} />
    <GithubCorner
        href="https://github.com/jmercha/multilife"
        bannerColor="#fff"
        octoColor="#000"
        size={80}
        direction="right" 
    />
    <Provider store={store}>
        <h1>MultiLife!</h1>
        <p>Constructed with curiosity by <a href="https://jmercha.github.io/">jmercha</a>. 🤓</p>
        <WebSocketConnection url={socketUrl}>
            <main css={containerStyle}>
                <aside css={sidebarStyle}>
                    <Colors />
                </aside>
                <Game />
            </main>
        </WebSocketConnection>
    </Provider>
</React.Fragment>;