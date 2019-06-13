import { Cell, World, WorldLookup, Point, ColorRanking } from "../models";

/**
 * Creates a lookup of living Cells by location
 * @param world 
 */
export function createLookup(world: World): WorldLookup {
    const set = new Map<string, Cell>(world.map(c => [encode(c), c]));
    return (p) => set.get(encode(p));
}

/**
 * Returns the String representation of a Point.
 */
export const encode = (cell: Point) => `${cell.x},${cell.y}`;

/**
 * Iterates through all Cells in the World
 */
export function *cells(world: World): IterableIterator<Point> {
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
export function range(world: World): { min: Point, max: Point } {

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
            stringBuilder.push((typeof lookup({x, y}) !== 'undefined') ? ' ⬛ ' : ' ⬜ ');
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
            row.push(typeof lookup({x, y}) !== 'undefined');
        }
        grid.push(row);
    }
    return grid;
}

/**
 * Looks up a list of adjacent Cells
 */
export function lookupNeighbors(cell: Point, lookup: WorldLookup): Cell[] {
    const neighbors: Point[] = [
        { x: cell.x-1, y: cell.y-1 },
        { x: cell.x, y: cell.y-1 },
        { x: cell.x+1, y: cell.y-1 },
        { x: cell.x-1, y: cell.y },
        { x: cell.x+1, y: cell.y },
        { x: cell.x-1, y: cell.y+1 },
        { x: cell.x, y: cell.y+1 },
        { x: cell.x+1, y: cell.y+1 }
    ];
    return neighbors.map(lookup).filter(c => typeof c !== 'undefined').map(c => c as Cell);
}

/**
 * Adds or removes a Cell from the World
 * @param world 
 * @param cell 
 * @param alive 
 */
export const setCell = (world: World, cell: Cell, alive: boolean) => 
    alive
        ? [...world, cell]
        : [...world].filter(({x, y}) => x !== cell.x || y !== cell.y);

/**
 * Gets color ranking from a World
 * @param world The World
 */
export const colorRanking = (world: World): ColorRanking => 
    [...world
        .map(({ color }) => color)
        .reduce((map, c) => map.set(c, (map.get(c) || 0) + 1), new Map<string, number>())
    ].map(kvp => ({ color: kvp[0], count: kvp[1] }))
    .sort((x, y) => y.count - x.count);