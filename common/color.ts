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

/**
 * Gives a HTML color a name
 * @param color 
 */
export const colorName = (color: string) => colorNamer(color, { pick: ['html'] }).html[0].name;

/**
 * Converts RGB values to HTML color
 * @param r Red
 * @param g Green
 * @param b Blue
 */
export const rgbToHex = (r: number, g: number, b: number) => color.rgb(r, g, b).hex();

/**
 * Converts HTML color string to RGB values
 * @param hex 
 */
export const hexToRgb = (hex: string) => {
    const obj = color(hex);
    return [obj.red(), obj.green(), obj.blue()];
};

/**
 * Generates a random value
 * @param min 
 * @param max 
 */
const rand = (min: number, max: number): number => Math.random() * (max - min) + min;

/**
 * Caches values of the mix fn
 */
const mixCache = new WeakMap<string[], string>();

/**
 * Combines colors
 * @param colors colors to mix
 */
export const mix = (colors: string[]) => {
    if (mixCache.has(colors)) return <string>mixCache.get(colors);
    const result = colors.map(c => color(c)).reduce((x, y) => x.mix(y)).hex();
    mixCache.set(colors, result);
    return result;
};