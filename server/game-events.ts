import { Game } from "./game";
import { EventEmitter } from "events";

declare interface GameState {
    on(event: 'update', listener: (state: Game) => void): this;
    on(event: 'refresh', listener: () => void): this;
    on(event: 'stop', listener: () => void): this;
    on(event: 'putcell', listener: (cell: Cell) => void): this;
}

/**
 * Handles changes in Game State 
 */
export class GameEvents extends EventEmitter {
    
    private _game = new Game();
    private _interval = setInterval(() => this.tick(), 1000);

    constructor() {
        super();
        this.on('putcell', this.putCell);
        this.on('refresh', this.refresh);
    }

    private putCell(cell: Cell) {
        this.emit('update', this._game = this._game.putCell(cell));
    }

    stop() {
        clearInterval(this._interval);
        this.emit('stop');
    }

    private refresh() {
        this.emit('update', this._game);
    }

    private tick() {
        this.emit('update', this._game = this._game.tick());
    }
}