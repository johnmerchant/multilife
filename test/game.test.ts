import {Game} from '../server/game';

const color = '#FFFFFF';

describe('neighbors', () => {

    /*
    XXX
    X X
    XXX 
    */
    const game = new Game([
        { x: -1, y: -1, color },
        { x: 0, y: -1, color },
        { x: 1, y: -1, color },
        { x: -1, y: 0, color },
        { x: 1, y: 0, color },
        { x: -1, y: 1, color },
        { x: 0, y: 1, color },
        { x: 1, y: 1, color }
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
        expect(game.lookup({ x: -1, y: -1 })).toBeTruthy();
        expect(game.lookup({ x: -8, y: -2 })).toBeFalsy();
        expect(game.lookup({ x: 0, y: 1 })).toBeTruthy();
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
        { x: 1, y: 0, color },
        { x: 2, y: 1, color },
        { x: 0, y: 2, color }, 
        { x: 1, y: 2, color },
        { x: 2, y: 2, color }
    ]);

    test('tick', () => {
        const tick1 = game.tick();
        expect(tick1.world).toEqual([
            { x: 0, y: 1, color },
            { x: 1, y: 2, color },
            { x: 1, y: 3, color },
            { x: 2, y: 1, color },
            { x: 2, y: 2, color }
        ]);
        const tick2 = tick1.tick();
        expect(tick2.world).toEqual([
            { x: 0, y: 2, color },
            { x: 1, y: 3, color },
            { x: 2, y: 1, color },
            { x: 2, y: 2, color },
            { x: 2, y: 3, color }
        ]);
    });

});