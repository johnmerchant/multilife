import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux'; 
import { State } from '../reducers';
interface StateProps {
    isConnected: boolean;
}

type Props = StateProps;

const WebSocketConnectionComponent: FunctionComponent<Props> = ({ isConnected, children }) => {
    if (!isConnected) return <span>Connecting...</span>;
    return <React.Fragment>{children}</React.Fragment>;
};

/**
 * Connects the App to the WebSocket endpoint.
 */
export const WebSocketConnection = connect(
    (state: State) => ({ isConnected: state.socket.isConnected })
)(WebSocketConnectionComponent);