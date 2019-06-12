import { AnyAction, Reducer } from "redux";
import { World, Message, MessageType, Update, SetCell, CellRange, WorldLookup } from "../../models";
import { WEBSOCKET_MESSAGE, WEBSOCKET_SEND } from '@giantmachines/redux-websocket';
import { WS_PREFIX } from "./socket";
import { range, setCell, createLookup } from "../../common/world";

export interface GameState {
    world: World;
    range: CellRange;
}

export const initialState: GameState = {
    world: [],
    range: {
        min: { x: 0, y: 0 },
        max: { x: 0, y: 0 },
    }
};

export const game: Reducer<GameState> = (state = initialState, action: AnyAction) => {
    let message: Message;
    switch (action.type) {
        case WS_PREFIX + WEBSOCKET_MESSAGE:
            message = JSON.parse(action.payload.message);
            switch (message.type) {
                case MessageType.Update:
                    const update = <Update>message;
                    return { 
                        ...state, 
                        world: update.world,
                        range: range(update.world),
                        lookup: createLookup(update.world)
                     };
            }
            break;
        case WS_PREFIX + WEBSOCKET_SEND:
            message = action.payload;
            switch (message.type) {
                case MessageType.SetCell:
                    const {cell, alive} = <SetCell>message;
                    const world = setCell(state.world, cell, alive);
                    return { ...state, world, range: range(world) };
            }
            break;
    }
    return {...state};
}