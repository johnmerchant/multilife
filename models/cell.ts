export interface Point {
    x: number;
    y: number;
}

export interface Cell extends Point { 
    color: string; 
};

export interface Range {
    min: Point;
    max: Point;
}