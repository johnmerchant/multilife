import { AnyAction, Reducer } from "redux";
import { World, Message, Range, isUpdate, isSetCell, isSpeed, isColor, ColorRanking } from "../../models";
import { WEBSOCKET_MESSAGE, WEBSOCKET_SEND } from '@giantmachines/redux-websocket';
import { WS_PREFIX } from "./socket";
import { range, setCell, createLookup, colorRanking, colorName } from "../../common/world";

export interface GameState {
    speed?: number;
    color?: string;
    colorName?: string;
    colorRanking?: ColorRanking;
    world?: World;
    range?: Range;
}

export const initialState: GameState = { 

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
            ...reduceWorld(message.world)
         };
    }
    if (isSetCell(message)) {
        const {cell, alive} = message;
        const world = setCell(state.world || [], cell, alive);
        return { ...state, world, ...reduceWorld(world) };
    }
    if (isSpeed(message)) {
        return {...state, speed: message.speed };
    }
    if (isColor(message)) {
        return {...state, color: message.color, colorName: colorName(message.color) };
    }

    return {...state};
}

const reduceWorld = (world: World) => ({
    colorRanking: colorRanking(world),
    range: range(world),
    lookup: createLookup(world)
});