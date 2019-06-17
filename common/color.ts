import color from 'color';

export const randomColor = () => color.hsl(rand(0, 360), rand(80, 100), rand(60, 90)).hex();

const rand = (min: number, max: number): number => Math.random() * (max - min) + min;