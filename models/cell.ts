export interface Point {
    x: number;
    y: number;
}

export type Cell = Point & { color: string; };

export interface Range {
    min: Point;
    max: Point;
}