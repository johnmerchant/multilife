import color from 'color';
import { World, ColorRanking } from '../models';
import colorNamer from 'color-namer';

/** Generates a random color */
export const randomColor = () => color.hsl(rand(0, 360), 100, rand(40, 65)).hex();

/**
 * Gets color ranking from a World
 * @param world The World
 */
export const colorRanking = (world: World): ColorRanking => 
    [...world
        .map(({ color }) => ({ color, name: colorName(color) }))
        .reduce((map, {color, name}) => {
            let data = map.get(name);
            if (data) {
                data.count += 1;
            } else {
                data = {color, count: 1};
            }
            return map.set(name, data);
        }, new Map<string, { color: string, count: number }>())
    ].map(kvp => ({ name: kvp[0], ...kvp[1] }))
    .sort((x, y) => y.count - x.count);

export const colorName = (color: string) => colorNamer(color, { pick: ['basic'] }).basic[0].name;

export const rgbToHex = (r: number, g: number, b: number) => color.rgb(r, g, b).hex();
export const hexToRgb = (hex: string) => {
    const c = color(hex);
    return [c.red(), c.green(), c.blue()];
};

const rand = (min: number, max: number): number => Math.random() * (max - min) + min;