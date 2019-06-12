
import { Reducer } from 'redux';
import { combineReducers } from 'redux';
import { socket, SocketState } from './socket';
import { game, GameState } from './game';

export interface State {
    socket: SocketState;
    game: GameState;
};

export const reducer: Reducer<State> = combineReducers({
    socket,
    game,
});