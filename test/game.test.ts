import {Game} from '../server/game';

/**
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
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
]);

test('lookup neighbors', () => {
    const neighbors = [...game.lookupNeighbors({ x: 0, y: 0 }, game.createMap())];
    console.log(neighbors);
    expect(neighbors.length).toBe(8);
});

test('range', () => {
    const { min, max } = game.range();
    expect(min.x).toBe(-1);
    expect(min.y).toBe(-1);
    expect(max.x).toBe(1);
    expect(max.y).toBe(1);
});