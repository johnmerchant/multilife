import { Store, ActionCreator } from "redux";
import { Message } from "../../models";
import { serializeMessage, deserializeMessage } from "../../common/protocol";
import toBuffer from 'blob-to-buffer';

const url = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : '/ws' }`;

export const WS_OPEN = 'WS_OPEN';
export interface WsOpenAction {
    type: typeof WS_OPEN
}
const wsOpen: ActionCreator<WsOpenAction> = () => ({ type: WS_OPEN });

export const WS_CLOSE = 'WS_CLOSE';
export interface WsClosedAction {
    type: typeof WS_CLOSE
}
const wsClose = () => ({ type: WS_CLOSE });

export const WS_RECEIVE = 'WS_RECEIVE';
export interface WsReceiveAction {
    type: typeof WS_RECEIVE;
    message: Message;
}
const wsReceive: ActionCreator<WsReceiveAction> = (message: Message) => ({ 
    type: WS_RECEIVE,
    message
});

export const WS_SEND = 'WS_SEND';
export interface WsSendAction {
    type: typeof WS_SEND;
    message: Message;
}
export const send: ActionCreator<WsSendAction> = (message: Message) => {
    if (socket) {
        socket.send(serializeMessage(message));
    }
    return { type: WS_SEND, message };
};

let socket: WebSocket | null = null;

export const init = (store: Store) => {
    socket = new WebSocket(url);
    socket.onopen = () => store.dispatch(wsOpen());
    socket.onclose = () => store.dispatch(wsClose());
    socket.onmessage = (event) => { 
        const blob: Blob = event.data;
        toBuffer(blob, (err, buffer) => {
            if (err) { 
                console.error(err);
                return;
            }
            store.dispatch(wsReceive(deserializeMessage(buffer)));
        });
    };
};