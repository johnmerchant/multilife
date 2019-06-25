/** @jsx jsx */
import { jsx } from '@emotion/core';

import {useState, useRef, useEffect} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { World, Cell, Range, Point } from '../../models';
import { State } from '../reducers';
import { setCell, drawCells } from '../actions/messages';
import {canvasContainerStyle} from '../styles';
import { setCells } from '../../common/world';

interface StateProps {
    world?: World;
    range?: Range;
    color?: string;
}

interface DispatchProps {
    sendSetCell(cell: Cell, alive: boolean): void;
    sendDrawCells(color: string, cells: Point[]): void;
}

interface OwnProps {
}

type Props = StateProps & DispatchProps & OwnProps;

const CELL_HEIGHT = 14;
const CELL_WIDTH = 14;

const GameComponent = ({ world, range, sendDrawCells, color }: Props) => {

    if (!color || typeof world === 'undefined' || typeof range === 'undefined') {
     return <span>Awaiting the World state...</span>;
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const parent = canvas.parentNode as HTMLElement;
            if (parent) {
                const styles = getComputedStyle(parent);
                canvas.width = parseInt(styles.getPropertyValue('width'), 10);
                canvas.height = parseInt(styles.getPropertyValue('height'), 10);
            }

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#000'; // black out
                ctx.fillRect(0, 0, canvas.width * CELL_WIDTH, canvas.height * CELL_WIDTH);

                const currentWorld = setCells(world, drawingStateRef.current.points.map(({x ,y}) => ({ x, y, color })));
                for (const cell of currentWorld) {
                    drawCell(ctx, cell);
                }
            }
        }
    }, [canvasRef, range, world]);

    const [drawingState, setDrawingState] = useState({
        isDrawing: false,
        points: new Array<Point>()
    });

    const drawingStateRef = useRef(drawingState);

    return <div css={canvasContainerStyle}> 
        <canvas 
            ref={canvasRef} 
            width="100%"
            height="100%"
            onClick={(event) => {
                if (!color) return; // we don't have a color from the server yet...
                if (drawingStateRef.current.isDrawing) return;

                const canvas = event.target as HTMLCanvasElement;
                const cell: Cell = { 
                    ...translatePosition(event.target as HTMLCanvasElement, event.clientX, event.clientY),
                    color
                };
                setCell(cell, true);
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = color;
                    drawCell(ctx, cell);
                }
            }}
            onMouseDown={(event) => {
                if (!color) return;

                const canvas = event.target as HTMLCanvasElement;

                const cell: Cell = {
                    ...translatePosition(canvas, event.clientX, event.clientY),
                    color
                };

                const ctx = canvas.getContext('2d');
                if (ctx) drawCell(ctx, cell);

                const nextState = { 
                    isDrawing: true,
                    points: [cell]
                };

                drawingStateRef.current = nextState;
                setDrawingState(nextState);
            }}
            onMouseMove={(event) => {
                if (!color) return;
                const currentDrawingState = drawingStateRef.current;
                if (!currentDrawingState.isDrawing) return;
                
                const canvas = event.target as HTMLCanvasElement;
                const {x, y} = translatePosition(canvas, event.clientX, event.clientY);
                const exists = currentDrawingState.points.some((p) => x === p.x && y === p.y);
                
                if (!exists) {
                    const cell = {x, y, color};
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        drawCell(ctx, cell);
                    }
                    const nextState = {
                        isDrawing: true,
                        points: [...currentDrawingState.points, {x, y}],
                    };
                    drawingStateRef.current = nextState;
                    setDrawingState(nextState);
                }
            }}
            onMouseUp={() => {
                if (!color) return;

                const currentDrawingState = drawingStateRef.current;

                if (currentDrawingState.points.length > 0) {
                    drawCells(color, currentDrawingState.points);
                    sendDrawCells(color, currentDrawingState.points);
                }
                const nextState = {
                    isDrawing: false,
                    points: []
                };
                drawingStateRef.current = nextState;
                setDrawingState(nextState);
            }}
        />
    </div>;
};

const drawCell = (ctx: CanvasRenderingContext2D, cell: Cell) => {
    ctx.fillStyle = cell.color;
    ctx.shadowBlur = 2;
    ctx.shadowColor = cell.color;
    ctx.fillRect(cell.x * CELL_WIDTH, cell.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
};

const translatePosition = (canvas: HTMLCanvasElement, clientX: number, clientY: number): Point => {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top; 
    return { 
        x: Math.floor(x / CELL_WIDTH),
        y: Math.floor(y / CELL_HEIGHT)
    };
};

export const Game = connect(
    ({ game }: State) => ({ world: game.world, range: game.range, color: game.color }),
    (dispatch: Dispatch) => ({ 
        sendSetCell: (cell: Cell, alive: boolean) => dispatch(setCell(cell, alive)),
        sendDrawCells: (color: string, cells: Point[]) => dispatch(drawCells(color, cells))
    })
)(GameComponent);

