import { World, WorldLookup, Cell } from "../models";
import { cells, stringify, createLookup, range, lookupNeighbors, setCell } from "../common/world";
import color from 'color';

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
        this._lookup = createLookup(this._world);
    }

    setCell(cell: Cell, isAlive: boolean): Game {
        
        if (this._lookup(cell.x, cell.y) === isAlive) {
            return this; // no effect on state
        }
        
        return new Game(setCell(this._world, cell, isAlive));
    }

    range() {
        return range(this._world);
    }

    lookupNeighbors(cell: Cell): Cell[] {
        return lookupNeighbors(cell, this._lookup);
    }

    /**
     * Gets the next instance of the Game of Life state
     */
    tick(): Game {
        return new Game(
            [...cells(this._world)]
            .map(cell => ({
                cell,
                neighbors: [...this.lookupNeighbors(cell)],
                isAlive: this._lookup(cell.x, cell.y)        
            }))
            .filter(({ neighbors, isAlive }) => {
                if (isAlive) {
                    if (underpopulated(neighbors.length)) return false;
                    if (nextGeneration(neighbors.length)) return true;
                    if (overpopulated(neighbors.length)) return false;
                } else {
                    if (reproduce(neighbors.length)) return true; 
                }
            })
            .map(({cell, neighbors}) => ({ 
                x: cell.x,
                y: cell.y,
                color: reproduce(neighbors.length) ? neighbors.map(z => color(z.color)).reduce((c, y) => c.mix(y)).toString() : cell.color
            })));
    }

    toString() {
        return stringify(this._world, this._lookup);
    }
}

const underpopulated = (neighbors: number) => neighbors < 2;
const nextGeneration = (neighbors: number) => neighbors === 2 || neighbors === 3;
const overpopulated = (neighbors: number) => neighbors > 2;
const reproduce = (neighbors: number) => neighbors === 3;