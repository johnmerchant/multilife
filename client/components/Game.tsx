/** @jsx jsx */
import { jsx } from '@emotion/react';

import {useState, useRef, useEffect} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { World, Cell, Range, Point } from '../../models';
import { State } from '../reducers';
import { setCell, drawCells } from '../actions/messages';
import { canvasContainerStyle, canvasStyle } from '../styles';
import { setCells, MAX_Y, MAX_X } from '../../common/world';
import { touches } from '../util/touch';
import { translatePosition, drawCell } from '../util/canvas';
import { MAX_DRAW_CELLS_LENGTH } from '../../common/protocol';

interface StateProps {
    world?: World;
    range?: Range;
    color?: string;
    playerCount?: number;
}

interface DispatchProps {
    sendSetCell(cell: Cell, alive: boolean): void;
    sendDrawCells(color: string, cells: Point[]): void;
}

interface OwnProps {
}

type Props = StateProps & DispatchProps & OwnProps;

const GameComponent = ({ world, range, sendDrawCells, color, playerCount }: Props) => {

    if (!color || typeof world === 'undefined' || typeof range === 'undefined') {
        return <span>Awaiting the World state...</span>;
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [drawingState, setDrawingState] = useState({
        isDrawing: false,
        points: new Array<Point>()
    });
    const drawingStateRef = useRef(drawingState);
    const dimensionsRef = useRef({ cellWidth: 14, cellHeight: 14 });

    useEffect(() => {
        document.title = typeof playerCount !== 'undefined' && playerCount > 1 ? `MultiLife! (${playerCount - 1})` : 'MultiLife!';

        const canvas = canvasRef.current;
        if (canvas) {
            const parent = canvas.parentNode as HTMLElement;
            if (parent) {
                const styles = getComputedStyle(parent);
                let width = parseFloat(styles.getPropertyValue('width'));
                let height = parseFloat(styles.getPropertyValue('height'));
                const size = Math.min(width, height);
                canvas.width = size;
                canvas.height = size;
            }

            dimensionsRef.current = {
                cellWidth: canvas.width / MAX_X,
                cellHeight: canvas.height / MAX_Y
            };

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, dimensionsRef.current.cellWidth, canvas.height * dimensionsRef.current.cellHeight);

                const currentWorld = setCells(world, drawingStateRef.current.points.map(({x ,y}) => ({ x, y, color })));
                for (const cell of currentWorld) {
                    drawCell(ctx, cell, dimensionsRef.current.cellWidth, dimensionsRef.current.cellHeight);
                }

                const favicon: HTMLLinkElement | null = document.getElementById('favicon') as HTMLLinkElement;
                if (favicon) favicon.href = canvas.toDataURL();
            }
        }
    }, [canvasRef, range, world, playerCount, drawingStateRef]);


    const onBeginDrawing = (canvas: HTMLCanvasElement, points: Point[]) => {
        if (!color) return;

        const ctx = canvas.getContext('2d');

        for (const point of points) {

            const cell: Cell = {
                ...translatePosition(canvas, point.x, point.y, dimensionsRef.current.cellWidth, dimensionsRef.current.cellHeight),
                color
            };
    
            if (ctx) drawCell(ctx, cell,  dimensionsRef.current.cellWidth, dimensionsRef.current.cellHeight);
    
            const nextState = { 
                isDrawing: true,
                points: [cell]
            };
    
            drawingStateRef.current = nextState;
        }

        setDrawingState(drawingStateRef.current);
    };

    const onDrawing = (canvas: HTMLCanvasElement, points: Point[]) => {
        if (!color) return;
        if (!drawingStateRef.current.isDrawing) return;
        if (drawingStateRef.current.points.length >= MAX_DRAW_CELLS_LENGTH) return;
        
        for (const point of points) {
            const {x, y} = translatePosition(canvas, point.x, point.y, dimensionsRef.current.cellWidth, dimensionsRef.current.cellHeight);
            const exists = drawingStateRef.current.points.some((p) => x === p.x && y === p.y);
            
            if (!exists) {
                const cell = {x, y, color};
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    drawCell(ctx, cell, dimensionsRef.current.cellWidth, dimensionsRef.current.cellHeight);
                }
                const nextState = {
                    isDrawing: true,
                    points: [...drawingStateRef.current.points, {x, y}],
                };
                drawingStateRef.current = nextState;
            }
        }

        setDrawingState(drawingStateRef.current);
    };

    const onEndDrawing = () => {
        if (!color) return;

        const currentDrawingState = drawingStateRef.current;

        if (currentDrawingState.points.length > 0) {
            sendDrawCells(color, currentDrawingState.points);
        }
        const nextState = {
            isDrawing: false,
            points: []
        };
        drawingStateRef.current = nextState;
        setDrawingState(nextState);
    };

    return <div css={canvasContainerStyle}> 
        <canvas 
            css={canvasStyle}
            ref={canvasRef} 
            onMouseDown={(event) => onBeginDrawing(event.target as HTMLCanvasElement, [{ x: event.clientX, y: event.clientY }])}
            onTouchStart={(event) => {
                event.preventDefault();
                onBeginDrawing(event.target as HTMLCanvasElement, [...touches(event.changedTouches)])
            }}
            onMouseMove={(event) => { 
                if (event.buttons !== 1) return onEndDrawing();
                onDrawing(event.target as HTMLCanvasElement, [{ x: event.clientX, y: event.clientY }]);
            }}
            onTouchMove={(event) => { 
                event.preventDefault();
                onDrawing(event.target as HTMLCanvasElement,  [...touches(event.changedTouches)]);
            }}
            onMouseUp={() => onEndDrawing()}
            onTouchEnd={(event) => {
                event.preventDefault();
                onEndDrawing();
            }}
        />
    </div>;
};

export const Game = connect(
    ({ game }: State) => ({ world: game.world, range: game.range, color: game.color, playerCount: game.playerCount }),
    (dispatch: Dispatch) => ({ 
        sendSetCell: (cell: Cell, alive: boolean) => dispatch(setCell(cell, alive)),
        sendDrawCells: (color: string, cells: Point[]) => dispatch(drawCells(color, cells))
    })
)(GameComponent);

