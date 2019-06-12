import { Cell, World, WorldLookup } from "../models";

/**
 * Creates a lookup of living Cells by location
 * @param world 
 */
export function createLookup(world: World): WorldLookup {
    const set = new Set<string>(world.map(c => encode(c)));
    return (x, y) => set.has(encode({ x, y }));
}

/**
 * Returns the String representation of a Cell.
 */
export const encode = (cell: Cell) => `${cell.x},${cell.y}`;

/**
 * Iterates through all Cells in the World
 */
export function *cells(world: World): IterableIterator<Cell> {
    let {min, max} = range(world);
    for (let x = min.x; x <= max.x; ++x) {
        for (let y = min.y; y <= max.y; ++y) {
            yield {x, y};
        }
    }
}

/**
 * Reduces the World state into the minimum and maximum known cooridnates of living Cells.
 */
export function range(world: World): { min: Cell, max: Cell } {

    // aggregate min and max coordinates
    let {min, max} = world.reduce(({min, max}, cell) => ({ 
        min: { x: cell.x < min.x ? cell.x : min.x, y: cell.y < min.y ? cell.y : min.y },
        max: { x: cell.x > max.x ? cell.x : max.x, y: cell.y > max.y ? cell.y : max.y }
    }), { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } });

    // expand the edge of the world by 1 cell, this lets us detect dead cells on the edge
    min.x--;
    min.y--;
    max.x++;
    max.y++;

    return {min, max};
}

/**
 * Returns a string representation of a World grid.
 */
export function stringify(world: World, lookup: WorldLookup = createLookup(world)) {
    const {min, max} = range(world);
    const stringBuilder: string[] = [];
    for (let x = min.x; x <= max.x; ++x) {
        for (let y = min.y; y <= max.y; ++y) {
            stringBuilder.push(lookup(x, y) ? ' ⬛ ' : ' ⬜ ');
        }
        stringBuilder.push('\n');
    }
    return stringBuilder.join('');
}

/**
 * Returns a Boolean array representation of the World grid.
 */
export function toArray(world: World, lookup: WorldLookup = createLookup(world)): boolean[][] {
    const {min, max} = range(world);
    const grid: boolean[][] = [];
    for (let y = min.y; y <= max.y; ++y) {
        const row: boolean[] = [];
        for (let x = min.x; x <= max.x; ++x) {
            row.push(lookup(x, y));
        }
        grid.push(row);
    }
    return grid;
}

/**
 * Looks up a list of adjacent Cells
 */
export function lookupNeighbors(cell: Cell, lookup: WorldLookup): Cell[] {
    const neighbors: Cell[] = [
        { x: cell.x-1, y: cell.y-1 },
        { x: cell.x, y: cell.y-1 },
        { x: cell.x+1, y: cell.y-1 },
        { x: cell.x-1, y: cell.y },
        { x: cell.x+1, y: cell.y },
        { x: cell.x-1, y: cell.y+1 },
        { x: cell.x, y: cell.y+1 },
        { x: cell.x+1, y: cell.y+1 }
    ];
    return neighbors.filter(({x, y}) => lookup(x, y));
}

export const setCell = (world: World, cell: Cell, alive: boolean) => 
    alive
        ? [...world, cell]
        : [...world].filter(({x, y}) => x !== cell.x || y !== cell.y);
