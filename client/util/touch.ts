import { Point } from "../../models";

export function *touches(list: React.TouchList): IterableIterator<Point> {
    for (let i = 0; i < list.length; ++i) {
        const touch = list.item(i);
        if (touch) yield { x: touch.clientX, y: touch.clientY };
    }
}

export const isTouchDevice = 'ontouchstart' in document.documentElement;