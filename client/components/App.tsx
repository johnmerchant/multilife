/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import {createStore} from 'redux';
import {reducer} from '../reducers';
import {Provider} from 'react-redux';
import {WebSocketConnection} from './WebSocketConnection';
import { Game } from './Game';
import { Colors } from './Colors';
import { globalStyle, appStyle, containerStyle, sidebarStyle } from '../styles';
import GithubCorner from 'react-github-corner';
import { Welcome } from './Welcome';
import { init as initSocket } from '../actions/socket';
import { Header } from './Header';
import { Footer } from './Footer';

const store = createStore(reducer);
initSocket(store);

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
        <Header />
        <WebSocketConnection>
            <Welcome />
            <main css={containerStyle}>
                <aside css={sidebarStyle}>
                    <Colors />
                </aside>
                <Game />
            </main>
            <Footer />
        </WebSocketConnection>
    </Provider>
</div>;