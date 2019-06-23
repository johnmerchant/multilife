import { Reducer } from "redux";
import { WS_OPEN, WS_CLOSE } from "../actions/socket";
export interface SocketState {
    isConnected: boolean;
}

export const socket: Reducer<SocketState> = (state = { isConnected: false }, action) => {
    switch (action.type) {
        case WS_OPEN: return { ...state, isConnected: true };
        case WS_CLOSE: return { ...state, isConnected: false };
        default: return { ...state };
    }
};