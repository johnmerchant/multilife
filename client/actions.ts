import { Cell, MessageType } from "../models";
import { send } from '@giantmachines/redux-websocket';

export const setCell = (cell: Cell, alive: boolean) => send({
    type: MessageType.SetCell,
    cell,
    alive
});

export const setSpeed = (speed: number) => send({
    type: MessageType.Speed,
    speed
});