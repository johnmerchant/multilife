"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../server/game");
var color = '#FFFFFF';
describe('neighbors', function () {
    /*
    XXX
    X X
    XXX
    */
    var game = new game_1.Game([
        { x: -1, y: -1, color: color },
        { x: 0, y: -1, color: color },
        { x: 1, y: -1, color: color },
        { x: -1, y: 0, color: color },
        { x: 1, y: 0, color: color },
        { x: -1, y: 1, color: color },
        { x: 0, y: 1, color: color },
        { x: 1, y: 1, color: color }
    ]);
    test('lookup neighbors', function () {
        var neighbors = game.lookupNeighbors({ x: 0, y: 0 });
        expect(neighbors.length).toBe(8);
    });
    test('range', function () {
        var _a = game.range(), min = _a.min, max = _a.max;
        expect(min.x).toBe(-2);
        expect(min.y).toBe(-2);
        expect(max.x).toBe(2);
        expect(max.y).toBe(2);
    });
    test('createMap', function () {
        expect(game.lookup({ x: -1, y: -1 })).toBeTruthy();
        expect(game.lookup({ x: -8, y: -2 })).toBeFalsy();
        expect(game.lookup({ x: 0, y: 1 })).toBeTruthy();
    });
});
describe('glider', function () {
    /**
     ⬜  ⬜  ⬜  ⬜  ⬜
     ⬜  ⬜  ⬜  ⬛  ⬜
     ⬜  ⬛  ⬜  ⬛  ⬜
     ⬜  ⬜  ⬛  ⬛  ⬜
     ⬜  ⬜  ⬜  ⬜  ⬜
     */
    var game = new game_1.Game([
        { x: 1, y: 0, color: color },
        { x: 2, y: 1, color: color },
        { x: 0, y: 2, color: color },
        { x: 1, y: 2, color: color },
        { x: 2, y: 2, color: color }
    ]);
    test('tick', function () {
        var tick1 = game.tick();
        expect(tick1.world).toEqual([
            { x: 0, y: 1, color: color },
            { x: 1, y: 2, color: color },
            { x: 1, y: 3, color: color },
            { x: 2, y: 1, color: color },
            { x: 2, y: 2, color: color }
        ]);
        var tick2 = tick1.tick();
        expect(tick2.world).toEqual([
            { x: 0, y: 2, color: color },
            { x: 1, y: 3, color: color },
            { x: 2, y: 1, color: color },
            { x: 2, y: 2, color: color },
            { x: 2, y: 3, color: color }
        ]);
    });
});
