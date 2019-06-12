import { Game } from "./game";
import { EventEmitter } from "events";
import { Cell } from "../models";
import { thisTypeAnnotation } from "@babel/types";

declare interface IGameEvents {
    on(event: 'update', listener: (state: Game) => void): this;
    on(event: 'refresh', listener: () => void): this;
    on(event: 'stop', listener: () => void): this;
    on(event: 'setcell', listener: (cell: Cell, isAlive: boolean) => void): this;
}

/**
 * Handles changes in Game State 
 */
export class GameEvents extends EventEmitter implements IGameEvents {
    
    private _game = new Game(); // current state
    private _speed: number = 1000;
    private _interval = setInterval(() => this.tick(), this._speed);
    
    get speed() {
        return this._speed;
    }

    constructor() {
        super();
        this.on('setcell', this.setCell);
        this.on('refresh', this.refresh);
        this.on('speed', this.setSpeed);
    }

    private setCell(cell: Cell, isAlive: boolean) {
        this._game = this._game.setCell(cell, isAlive);
        this.refresh();
    }

    stop() {
        clearInterval(this._interval);
        this.emit('stop');
    }

    private refresh() {
        this.emit('update', this._game.world);
    }

    private tick() {
        this._game = this._game.tick();
        this.refresh();
    }

    private setSpeed(speed: number) {
        clearInterval(this._interval);
        this._interval = setInterval(() => this.tick(), speed);
    }
}