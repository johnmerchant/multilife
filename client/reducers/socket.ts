import { WEBSOCKET_OPEN, WEBSOCKET_BROKEN, WEBSOCKET_CLOSED, DEFAULT_PREFIX } from '@giantmachines/redux-websocket'; 
import { Reducer } from "redux";

export const WS_PREFIX = DEFAULT_PREFIX + '::';
export interface SocketState {
    isConnected: boolean;
}

export const socket: Reducer<SocketState> = (state = { isConnected: false }, action) => {
    switch (action.type) {
        case WS_PREFIX + WEBSOCKET_OPEN: return { ...state, isConnected: true };
        case WS_PREFIX + WEBSOCKET_BROKEN:
        case WS_PREFIX + WEBSOCKET_CLOSED:
            return { ...state, isConnected: false };
        default: return {...state};
    }
};