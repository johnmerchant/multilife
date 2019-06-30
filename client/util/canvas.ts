import { Cell, Point } from "../../models";

export const drawCell = (ctx: CanvasRenderingContext2D, cell: Cell, width: number, height: number) => {
    ctx.fillStyle = cell.color;
    ctx.shadowBlur = 2;
    ctx.shadowColor = cell.color;
    ctx.fillRect(cell.x * width, cell.y * height, width, height);
};

export const translatePosition = (canvas: HTMLCanvasElement, clientX: number, clientY: number, width: number, height: number): Point => {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top; 
    return { 
        x: Math.floor(x / width),
        y: Math.floor(y / height)
    };
};