/** @jsx jsx */
import { jsx } from '@emotion/core';

import React, {useRef, useEffect} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { World, Cell, Range, Point } from '../../models';
import { State } from '../reducers';
import { setCell } from '../actions';
import {canvasContainerStyle} from '../styles';

interface StateProps {
    world?: World;
    range?: Range;
    color?: string;
}

interface DispatchProps {
    setCell(cell: Cell, alive: boolean): void;
}

interface OwnProps {
}

type Props = StateProps & DispatchProps & OwnProps;

const CELL_HEIGHT = 14;
const CELL_WIDTH = 14;

const GameComponent = ({ world, range, setCell, color }: Props) => {

    if (!color || typeof world === 'undefined' || typeof range === 'undefined') {
     return <span>Awaiting the World state...</span>;
    }

    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current;
        if (canvas) {
            const parent = canvas.parentNode as HTMLElement;
            if (parent) {
                const styles = getComputedStyle(parent);
                canvas.width = parseInt(styles.getPropertyValue('width'), 10);
                canvas.height = parseInt(styles.getPropertyValue('height'), 10);
            }

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#000'; // back out
                ctx.fillRect(0, 0, canvas.width * CELL_WIDTH, canvas.height * CELL_WIDTH);
                for (const cell of world) {
                    drawCell(ctx, cell);
                }
            }
        }
    }, [ref, range, world]);
    return <div css={canvasContainerStyle}> 
        <canvas 
            ref={ref} 
            width="100%"
            height="100%"
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
        />
    </div>;
};

const drawCell = (ctx: CanvasRenderingContext2D, cell: Cell) => {
    ctx.fillStyle = cell.color;
    ctx.shadowBlur = 2;
    ctx.shadowColor = cell.color;
    ctx.fillRect(cell.x * CELL_WIDTH, cell.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
}

export const Game = connect(
    ({ game }: State) => ({ world: game.world, range: game.range, color: game.color }),
    (dispatch: Dispatch) => ({ 
        setCell: (cell: Cell, alive: boolean) => dispatch(setCell(cell, alive)) 
    })
)(GameComponent);

