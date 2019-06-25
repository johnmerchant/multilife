import { AnyAction, Reducer } from "redux";
import { World, Message, Range, isUpdateMessage, isSetCellMessage, isColorMessage, ColorRanking, isPlayerCountMessage, isDrawCellsMessage, Cell } from "../../models";
import { range, setCell, createLookup, setCells } from "../../common/world";
import { colorName, colorRanking } from "../../common/color";
import { WS_RECEIVE, WS_SEND } from "../actions/socket";

export interface GameState {
    speed?: number;
    color?: string;
    colorName?: string;
    colorRanking?: ColorRanking;
    world?: World;
    range?: Range;
    playerCount?: number;
}

export const initialState: GameState = { 

};

export const game: Reducer<GameState> = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case WS_SEND:
        case WS_RECEIVE:
            return handleMessage(state, action.message);
    }
    return {...state};
}

const handleMessage = (state: GameState, message: Message) => {
    if (isUpdateMessage(message)) {
        return { 
            ...state, 
            world: message.world,
            ...reduceWorld(message.world)
         };
    } else if (isSetCellMessage(message)) {
        const {cell, alive} = message;
        const world = setCell(state.world || [], cell, alive);
        return { ...state, world, ...reduceWorld(world) };
    }
    else if (isColorMessage(message)) {
        return {...state, color: message.color, colorName: colorName(message.color) };
    } 
    else if (isPlayerCountMessage(message)) {
        return {...state, playerCount: message.count };
    } else if (isDrawCellsMessage(message)) {
        const world = setCells(state.world || [], message.cells.map(({x, y}) => ({ x, y, color: message.color })));
        return {...state, world, ...reduceWorld(world) };
    }
    return {...state};
}

const reduceWorld = (world: World) => ({
    colorRanking: colorRanking(world),
    range: range(world),
    lookup: createLookup(world)
});