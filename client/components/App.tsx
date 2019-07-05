/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from '../reducers';
import {Provider} from 'react-redux';
import {WebSocketConnection} from './WebSocketConnection';
import { Game } from './Game';
import { Colors } from './Colors';
import { globalStyle, appStyle, containerStyle, sidebarStyle } from '../styles';
import GithubCorner from 'react-github-corner';
import { Welcome } from './Welcome';
import { init } from '../actions/socket';
import { Title } from './Title';

const store = createStore(reducer);
init(store);

export const App = () => <div css={appStyle}>
    <Global styles={globalStyle} />
    <GithubCorner
        href="https://github.com/jmercha/multilife"
        bannerColor="#fff"
        octoColor="#000"
        size={80}
        direction="right" 
    />
    <Provider store={store}>
        <Title text="MultiLife!"/>
        <p>Welcome, this is a peculiar experiment in <a target="_blank" href="https://en.wikipedia.org/wiki/Cellular_automaton">cellular automata</a>, constructed with curiosity by <a href="https://jmercha.github.io/">jmercha</a>. 🤓</p>
        <p>Everyone who visits multilife.live sees the same grid.</p>
        <WebSocketConnection>
            <Welcome />
            <main css={containerStyle}>
                <aside css={sidebarStyle}>
                    <Colors />
                </aside>
                <Game />
            </main>
        </WebSocketConnection>
    </Provider>
</div>;