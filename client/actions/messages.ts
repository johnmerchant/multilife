import { Cell, MessageType, SetCellMessage, Message, NewColorMessage, DrawCellsMessage, Point } from "../../models";
import { send } from "./socket";

export const setCell = (cell: Cell, alive: boolean) => sendMessage<SetCellMessage>({
    type: MessageType.SetCell,
    cell,
    alive
});

export const drawCells = (color: string, cells: Point[]) => sendMessage<DrawCellsMessage>({
    type: MessageType.DrawCells,
    color,
    cells
});

export const newColor = () => sendMessage<NewColorMessage>({ type: MessageType.NewColor });

const sendMessage = <T extends Message>(message: T) => send(message);