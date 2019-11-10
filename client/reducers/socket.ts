import produce from "immer";
import { Reducer } from "redux";
import { WS_OPEN, WS_CLOSE } from "../actions/socket";

export interface SocketState {
    isConnected: boolean;
}

const initialState: SocketState = { isConnected: false };

export const socket: Reducer<SocketState> = produce((state, action) => {
    switch (action.type) {
        case WS_OPEN: 
            state.isConnected = true;
            return;
        case WS_CLOSE:
            state.isConnected = false;
            return;
    }
}, initialState);