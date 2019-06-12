import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux'; 
import { connect as connectSocket } from '@giantmachines/redux-websocket';
import { State } from '../reducers';

interface DispatchProps {
    connect(url: string): void;
}

interface StateProps {
    isConnected: boolean;
}

interface OwnProps {
    url: string;
}

type Props = DispatchProps & OwnProps & StateProps;

const WebSocketConnectionComponent: FunctionComponent<Props> = ({ url, isConnected, connect, children }) => {
    // this ensures we are always connected, or trying to connect to the websocket endpoint!
    useEffect(() => { if (!isConnected) connect(url); }, [url, isConnected]);
    return <React.Fragment>{children}</React.Fragment>;
};

/**
 * Connects the App to the WebSocket endpoint.
 */
export const WebSocketConnection = connect(
    (state: State) => ({ isConnected: state.socket.isConnected }),
    (dispatch) => ({ connect: (url: string) => dispatch(connectSocket(url)) })
)(WebSocketConnectionComponent);