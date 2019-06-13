import { AnyAction, Reducer } from "redux";
import { World, Message, MessageType, Update, SetCell, Range, WorldLookup, Speed, isUpdate, isSetCell, isSpeed, isColor } from "../../models";
import { WEBSOCKET_MESSAGE, WEBSOCKET_SEND } from '@giantmachines/redux-websocket';
import { WS_PREFIX } from "./socket";
import { range, setCell, createLookup } from "../../common/world";

export interface GameState {
    speed?: number;
    color?: string;
    world: World;
    range: Range;
}

export const initialState: GameState = {
    world: [],
    range: {
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
    }
};

export const game: Reducer<GameState> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        // Receive
        case WS_PREFIX + WEBSOCKET_MESSAGE:
            return handleMessage(state, JSON.parse(action.payload.message));
        // Send
        case WS_PREFIX + WEBSOCKET_SEND:
            return handleMessage(state, action.payload);
    }
    return {...state};
}

const handleMessage = (state: GameState, message: Message) => {
    if (isUpdate(message)) {
        return { 
            ...state, 
            world: message.world,
            range: range(message.world),
            lookup: createLookup(message.world)
         };
    }
    if (isSetCell(message)) {
        const {cell, alive} = message;
        const world = setCell(state.world, cell, alive);
        return { ...state, world, range: range(world) };
    }
    if (isSpeed(message)) {
        return {...state, speed: message.speed};
    }
    if (isColor(message)) {
        return {...state, color: message.color};
    }

    return {...state};
}