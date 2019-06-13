import React, {useRef, useEffect} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { World, Cell, Range, Point } from '../../models';
import { State } from '../reducers';
import { setCell } from '../actions';

interface StateProps {
    world: World;
    range: Range;
    color?: string;
}

interface DispatchProps {
    setCell(cell: Cell, alive: boolean): void;
}

interface OwnProps {
    width: number;
    height: number;
}

type Props = StateProps & DispatchProps & OwnProps;

const CELL_HEIGHT = 12;
const CELL_WIDTH = 12;

const GameComponent = ({ world, range, setCell, color, width, height }: Props) => {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, width * CELL_WIDTH, height * CELL_WIDTH);
                for (const cell of world) {
                    drawCell(ctx, cell);
                }
            }
        }
    }, [ref, range, world]);
    return <canvas 
        ref={ref} 
        width={width * CELL_WIDTH} 
        height={height * CELL_HEIGHT}
        onClick={(event) => {
            if (!color) return; // we don't have a color from the server yet...

            const canvas = event.target as HTMLCanvasElement;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top; 
            const cell: Cell = { 
                x: Math.floor(x / CELL_WIDTH),
                y: Math.floor(y / CELL_HEIGHT),
                color 
            };
            setCell(cell, true);
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = color;
                drawCell(ctx, cell);
            }
        }}
    />;
};

const drawCell = (ctx: CanvasRenderingContext2D, cell: Cell) => {
    ctx.fillStyle = cell.color;
    ctx.fillRect(cell.x * CELL_WIDTH, cell.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
}

export const Game = connect(
    ({ game }: State) => ({ world: game.world, range: game.range, color: game.color }),
    (dispatch: Dispatch) => ({ 
        setCell: (cell: Cell, alive: boolean) => dispatch(setCell(cell, alive)) 
    })
)(GameComponent);

