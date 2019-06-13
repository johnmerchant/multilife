/** @jsx jsx */
import { jsx } from '@emotion/core';

import {createStore, applyMiddleware} from 'redux';
import {reducer} from '../reducers';
import {Provider} from 'react-redux';
import createMiddleware  from '@giantmachines/redux-websocket';
import {WebSocketConnection} from './WebSocketConnection';
import { Game } from './Game';
import { Colors } from './Colors';
import { containerStyle, sidebarStyle } from '../styles';

const store = createStore(
    reducer,
    applyMiddleware(createMiddleware())
);

export const App = () => 
    <Provider store={store}>
        <h1>MultiLife!</h1>
        <p>Constructed with curiousity by <a href="https://jmercha.github.io/">jmercha</a>.</p>
        <WebSocketConnection url="ws://localhost:5000/">
            <main css={containerStyle}>
                <aside css={sidebarStyle}>
                    <Colors />
                </aside>
                <Game />
            </main>
        </WebSocketConnection>
    </Provider>