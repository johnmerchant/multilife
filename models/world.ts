import { Cell, Point } from "./cell";

export type World = ReadonlyArray<Cell>;
export type WorldLookup = (point: Point) => Cell | undefined;
export type ColorRanking = ReadonlyArray<{ color: string, name: string, count: number }>;