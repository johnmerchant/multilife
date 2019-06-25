import { World, WorldLookup, Cell, Point } from "../models";
import { cells, stringify, createLookup, range, lookupNeighbors, setCell, setCells } from "../common/world";
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
     * @param world A collection of living Cells
     */
    constructor(world?: World) {
        this._world = world || [];
        this._lookup = createLookup(this._world);
    }

    setCell(cell: Cell, isAlive: boolean): Game {
        
        if ((typeof this._lookup(cell) !== 'undefined') === isAlive) {
            return this; // no effect on state
        }
        
        return new Game(setCell(this._world, cell, isAlive));
    }

    drawCells(color: string, cells: Point[]): Game { 
        if (cells.length === 0) return this;
        return new Game(setCells(this._world, cells.map(({x, y}) => ({ x, y, color }))));
    }

    range() {
        return range(this._world);
    }

    lookupNeighbors(point: Point): Cell[] {
        return lookupNeighbors(point, this._lookup);
    }

    /**
     * Gets the next instance of the Game of Life state
     */
    tick(): Game {
        return new Game(
            [...cells(this._world)]
            .map(point => ({
                point,
                neighbors: [...this.lookupNeighbors(point)],
                cell: this._lookup(point)        
            }))
            .filter(({ neighbors, cell }) => {
                if (typeof cell !== 'undefined') {
                    if (underpopulated(neighbors.length)) return false;
                    if (nextGeneration(neighbors.length)) return true;
                    if (overpopulated(neighbors.length)) return false;
                } else {
                    if (reproduce(neighbors.length)) return true; 
                }
            })
            .map(({ cell, point, neighbors }) => ({ 
                x: point.x,
                y: point.y,
                color: reproduce(neighbors.length) || typeof cell === 'undefined'
                    ? neighbors.map(z => color(z.color)).reduce((x, y) => x.mix(y)).hex()
                    : cell.color
            }))
            // prevent gliders and other naughty creatures maxing out memory and CPU
            .filter(({ x, y }) => x >= 0 && y >= 0 && x <= 24 && y <= 24));
    }

    toString() {
        return stringify(this._world, this._lookup);
    }
}

const underpopulated = (neighbors: number) => neighbors < 2;
const nextGeneration = (neighbors: number) => neighbors === 2 || neighbors === 3;
const overpopulated = (neighbors: number) => neighbors > 2;
const reproduce = (neighbors: number) => neighbors === 3;