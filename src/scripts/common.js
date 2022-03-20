import { objectConfig } from './object.config.js';
const size = objectConfig.size;
const stage = 310;

export const x_diff = (x, object) => {
    return x - object.x;
};
export const y_diff = (y, object) => {
    return y - object.y;
};
export const within = (value) => {
    return value >= -size && value <= size;
};
export const restrictNegative = (value) => {
    if (value < 0) return stage - size;
    return value;
};
export const restrictPositive = (value) => {
    if (value >= stage) return 0;
    return value;
};
export const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
