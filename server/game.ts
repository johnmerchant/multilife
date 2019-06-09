/**
 * Represents an instance of Conway's Game of Life game state.
 */
export class Game {

    private world: World;

    /**
     * Creates an instance of the Game of Life
     * @param world A colleciton of living Cells
     */
    constructor(world?: World) {
        this.world = world || [];
    }

    /**
     * Gets the next instance of the Game of Life state
     */
    tick(): Game {
        let {min, max} = this.range();
        
        // expand the edge of the world by 1 cell, this lets us detect dead cells on the edge
        min.x--;
        min.y--;
        max.x++;
        max.y++;

        // lookup living cells
        const map = this.createMap();

        const nextWorld: World = []; // next gamestate

        for (let x = min.x; x < max.x; ++x) {
            for (let y = min.y; y < max.y; ++y) {
                const cell: Cell = {x, y};
                const neighbors = [...this.lookupNeighbors(cell, map)];
                const alive = map(x, y);
                if (alive) {
                    // Rule 1.
                    let dies = underpopulated(neighbors.length);
                    if (dies) {
                        continue; // rip.
                    }

                    // Rule 2.
                    let lives = nextGeneration(neighbors.length);
                    if (lives) {
                        nextWorld.push(cell);
                        continue;
                    }

                    // Rule 3.
                    dies = overpopulated(neighbors.length);
                    if (dies) {
                        continue; // rip.
                    }
                } else {
                    // Rule 4.
                    let lives = reproduce(neighbors.length);
                    if (lives) {
                        nextWorld.push(cell);
                        continue;
                    }
                }
            }
        }

        return new Game(nextWorld);
    }

    /**
     * Reduces the World state into the minimum and maximum known cooridnates of living Cells.
     */
    range() {
        return this.world.reduce(({min, max}, cell) => ({ 
            min: { x: cell.x < min.x ? cell.x : min.x, y: cell.y < min.y ? cell.y : min.y },
            max: { x: cell.x > max.x ? cell.x : max.x, y: cell.y > max.y ? cell.y : max.y }
        }), { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } });
    }

    createMap(): WorldMap {
        const lookup = new Set<string>(this.world.map(c => cellKey(c)));
        return (x, y) => lookup.has(cellKey({ x, y }));
    }

    *lookupNeighbors({x, y}: Cell, map: WorldMap): IterableIterator<Cell> {
        if (map(x - 1, y - 1)) yield {x: x - 1, y: y - 1};
        if (map(x, y - 1)) yield {x, y: y - 1};
        if (map(x + 1, y - 1)) yield {x: x + 1, y: y - 1};
        if (map(x - 1, y)) yield {x: x - 1, y};
        if (map(x + 1, y)) yield {x: x + 1, y};
        if (map(x - 1, y + 1)) yield {x: x - 1, y: y + 1};
        if (map(x, y + 1)) yield {x, y: y + 1};
        if (map(x + 1, y + 1)) yield {x: x + 1, y: y + 1};
    }
}


const underpopulated = (neighbors: number) => neighbors < 2;
const nextGeneration = (neighbors: number) => neighbors === 2 || neighbors === 3;
const overpopulated = (neighbors: number) => neighbors > 2;
const reproduce = (neighbors: number) => neighbors === 3;
const cellKey = (cell: Cell) => `${cell.x}_${cell.y}`;