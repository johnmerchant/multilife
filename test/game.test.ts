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
        const neighbors = game.lookupNeighbors({ x: 0, y: 0 }, game.createLookup());
        expect(neighbors.length).toBe(8);
    });
    
    test('range', () => {
        const { min, max } = game.range();
        expect(min.x).toBe(-1);
        expect(min.y).toBe(-1);
        expect(max.x).toBe(1);
        expect(max.y).toBe(1);
    });
    
    test('createMap', () => {
        const lookup = game.createLookup();
        expect(lookup(-1, -1)).toBe(true);
        expect(lookup(-8, -2)).toBe(false);
        expect(lookup(0, 1)).toBe(true);
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

    console.log(game.toString())

    test('tick1', () => {
        const tick1 = game.tick();
        const lookup = tick1.createLookup();
        console.log(tick1.toString());
        console.log(tick1.tick().toString());
    });

});