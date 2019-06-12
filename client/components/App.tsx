import {createStore, applyMiddleware} from 'redux';
import {reducer} from '../reducers';
import {Provider} from 'react-redux';
import createMiddleware  from '@giantmachines/redux-websocket';
import {WebSocketConnection} from './WebSocketConnection';
import React from 'react';
import { Game } from './Game';
import { Speed } from './Speed';

const store = createStore(
    reducer,
    applyMiddleware(createMiddleware())
);

export const App = () => 
    <Provider store={store}>
        <WebSocketConnection url="ws://localhost:5000/">
            <h1>MultiLife!</h1>
            <Speed min={100} max={500} />
            <Game width={800} height={600} />
        </WebSocketConnection>
    </Provider>