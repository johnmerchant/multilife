import { Cell, Point } from "./cell";

export type World = ReadonlyArray<Cell>;
export type WorldLookup = (point: Point) => Cell | undefined;
export type ColorRank = { color: string, name: string, count: number };
export type ColorRanking = ReadonlyArray<ColorRank>;