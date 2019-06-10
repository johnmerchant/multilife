import {Game} from '../server/game';

describe('neighbors', () => {

    /*
    XXX
    X X
    XXX 
    */
    const game = new Game([
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
    ]);
    

    test('lookup neighbors', () => {
        const neighbors = game.lookupNeighbors({ x: 0, y: 0 });
        expect(neighbors.length).toBe(8);
    });
    
    test('range', () => {
        const { min, max } = game.range();
        expect(min.x).toBe(-2);
        expect(min.y).toBe(-2);
        expect(max.x).toBe(2);
        expect(max.y).toBe(2);
    });
    
    test('createMap', () => {
        expect(game.lookup(-1, -1)).toBe(true);
        expect(game.lookup(-8, -2)).toBe(false);
        expect(game.lookup(0, 1)).toBe(true);
    });
});


describe('glider', () => {

    /**
     ⬜  ⬜  ⬜  ⬜  ⬜
     ⬜  ⬜  ⬜  ⬛  ⬜
     ⬜  ⬛  ⬜  ⬛  ⬜
     ⬜  ⬜  ⬛  ⬛  ⬜
     ⬜  ⬜  ⬜  ⬜  ⬜
     */
    const game = new Game([
        {x: 1, y: 0},
        {x: 2, y: 1},
        {x: 0, y: 2}, 
        {x: 1, y: 2},
        {x: 2, y: 2}
    ]);

    test('tick', () => {
        const tick1 = game.tick();
        expect(tick1.world).toEqual([
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 1 },
            { x: 2, y: 2 }
        ]);
        const tick2 = tick1.tick();
        expect(tick2.world).toEqual([
            { x: 0, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 2, y: 3 }
        ]);
    });

});