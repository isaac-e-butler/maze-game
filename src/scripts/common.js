import { mazeConfig } from '../config/maze.config.js';
import { objectConfig } from '../config/object.config.js';

// variables

export const objectSize = objectConfig.objectSize;
export const stageSize = mazeConfig.stageSize;

// functions

export const difference = (position, otherPosition) => {
    return position - otherPosition;
};

export const isNextTo = (value) => {
    return value >= -objectSize && value <= objectSize;
};

export const withinArea = (x, y, object) => {
    return isNextTo(difference(x, object.x)) && isNextTo(difference(y, object.y));
};

export const isTouching = (x, y, object) => {
    return difference(x, object.x) === 0 && difference(y, object.y) === 0;
};

export const restrict = (value) => {
    if (value < 0) return stageSize - objectSize;
    if (value >= stageSize) return 0;
    return value;
};

export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
