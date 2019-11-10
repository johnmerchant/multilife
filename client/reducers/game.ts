import { AnyAction, Reducer } from "redux";
import produce from "immer";
import { World, Message, Range, isUpdateMessage, isSetCellMessage, isColorMessage, ColorRanking, isPlayerCountMessage, isDrawCellsMessage } from "../../models";
import { range, setCell, setCells } from "../../common/world";
import { colorName, colorRanking } from "../../common/color";
import { WS_RECEIVE, WS_SEND } from "../actions/socket";

export interface GameState {
    speed?: number;
    color?: string;
    colorName?: string;
    colorRanking?: ColorRanking;
    world?: World;
    drawnCells?: World;
    range?: Range;
    playerCount?: number;
}

export const initialState: GameState = { };

export const game: Reducer<GameState> = produce((state: GameState, action: AnyAction) => {
    switch (action.type) {
        case WS_SEND:
        case WS_RECEIVE:
            handleMessage(state, action.message);
            break;
    }
}, initialState);

const handleMessage = (state: GameState, message: Message) => {
    if (isUpdateMessage(message)) {
        state.world = message.world;
        if (state.drawnCells) {
            state.world = setCells(state.world || [], state.drawnCells);
        }
        delete state.drawnCells;
        updateState(state);
    } else if (isSetCellMessage(message)) {
        const {cell, alive} = message;
        state.world = setCell(state.world || [], cell, alive);
        updateState(state);
    } else if (isColorMessage(message)) {
        state.color = message.color;
        state.colorName = colorName(message.color);
    } else if (isPlayerCountMessage(message)) {
        state.playerCount = message.count;
    } else if (isDrawCellsMessage(message)) {
        state.drawnCells = message.cells.map(({x, y}) => ({ x, y, color: message.color }));
        state.world = setCells(state.world || [], state.drawnCells);
        updateState(state);
    }
}

const updateState = (state: GameState) => {
    if (state.world) {
        state.colorRanking = colorRanking(state.world);
        state.range = range(state.world);
    }
};