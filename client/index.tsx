import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {reducer, initialState} from './reducers';
import {Provider} from 'react-redux';
import createMiddleware from '@giantmachines/redux-websocket';


const store = createStore(
    reducer,
    applyMiddleware(createMiddleware())
);

const App = () =>
    <Provider store={store}>
        <h1>Hello World</h1>
    </Provider>;


ReactDOM.render(<App/>, document.getElementById('app'));