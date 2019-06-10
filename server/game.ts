/**
 * Represents an instance of Conway's Game of Life game state.
 */
export class Game {

    private _world: World;
    private _lookup: WorldLookup;

    get lookup() {
        return this._lookup;
    }

    get world(): World {
        return this._world;
    }
    
    /**
     * Creates an instance of the Game of Life
     * @param world A colleciton of living Cells
     */
    constructor(world?: World) {
        this._world = world || [];
        const lookup = new Set<string>(this._world.map(c => cellKey(c)));
        this._lookup = (x, y) => lookup.has(cellKey({ x, y }));
    }

    putCell(cell: Cell): Game {
        if (this._lookup(cell.x, cell.y)) {
            return this;
        }
        const nextWorld: World = [...this._world, cell];
        return new Game(nextWorld);
    }

    /**
     * Gets the next instance of the Game of Life state
     */
    tick(): Game {
        return new Game(
            [...this.cells()]
            .map(cell => ({
                cell,
                neighbors: [...this.lookupNeighbors(cell)].length,
                isAlive: this._lookup(cell.x, cell.y)        
            }))
            .filter(({ neighbors, isAlive }) => {
                if (isAlive) {
                    if (underpopulated(neighbors)) return false;
                    if (nextGeneration(neighbors)) return true;
                    if (overpopulated(neighbors)) return false;
                } else {
                    if (reproduce(neighbors)) return true; 
                }
            })
            .map(({cell}) => cell)
        );
    }

    /**
     * Iterates through all Cells in the World
     */
    *cells(): IterableIterator<Cell> {
        let {min, max} = this.range();
        for (let x = min.x; x <= max.x; ++x) {
            for (let y = min.y; y <= max.y; ++y) {
                yield {x, y};
            }
        }
    }

    /**
     * Reduces the World state into the minimum and maximum known cooridnates of living Cells.
     */
    range() {
        let {min, max} = this._world.reduce(({min, max}, cell) => ({ 
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

    lookupNeighbors(cell: Cell): Cell[] {
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
        return neighbors.filter(({x, y}) => this._lookup(x, y));
    }

    toString() {
        const {min, max} = this.range();
        const stringBuilder: string[] = [];
        for (let x = min.x; x <= max.x; ++x) {
            for (let y = min.y; y <= max.y; ++y) {
                stringBuilder.push(this._lookup(x, y) ? ' ⬛ ' : ' ⬜ ');
            }
            stringBuilder.push('\n');
        }
        return stringBuilder.join('');
    }
}

const underpopulated = (neighbors: number) => neighbors < 2;
const nextGeneration = (neighbors: number) => neighbors === 2 || neighbors === 3;
const overpopulated = (neighbors: number) => neighbors > 2;
const reproduce = (neighbors: number) => neighbors === 3;
const cellKey = (cell: Cell) => `${cell.x}_${cell.y}`;