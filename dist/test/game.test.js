"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../server/game");
describe('neighbors', function () {
    /*
    XXX
    X X
    XXX
    */
    var game = new game_1.Game([
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
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
        expect(game.lookup(-1, -1)).toBe(true);
        expect(game.lookup(-8, -2)).toBe(false);
        expect(game.lookup(0, 1)).toBe(true);
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
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 }
    ]);
    console.log(game.toString());
    test('tick', function () {
        var tick1 = game.tick();
        console.log(tick1.toString());
        console.log(tick1.tick().toString());
    });
});
