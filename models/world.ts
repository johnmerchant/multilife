import { Cell } from "./cell";

export type World = ReadonlyArray<Cell>;
export type WorldLookup = (x: number, y: number) => boolean;