import Block from './block.js';

export default function generate(width, height) {
    const blockCollection = {
        data: [],
        x: Math.floor(width / blockSize),
        y: Math.floor(height / blockSize),
        pixel: 4,
    };

    for (let y = 0; y < blockCollection.y; y++) {
        let row = [];
        for (let x = 0; x < blockCollection.x; x++) {
            row.push(new Block(x, y, blockCollection.pixel));
        }
        blockCollection.data.push(row);
    }
    blockCollection.data = createMaze(blockCollection.data);
}

const getAvailable = (x, y) => {
    const right = [x + 1, y];
    const left = [x - 1, y];
    const down = [x, y + 1];
    const up = [x, y - 1];
    let available = [];
    if (isAvailable(left)) available.push(left);
    if (isAvailable(right)) available.push(right);
    if (isAvailable(up)) available.push(up);
    if (isAvailable(down)) available.push(down);
    if (available.length) return available;
    return false;
};

const isAvailable = (x, y, data) => {
    if (x < 0 || y < 0 || y >= data.length - 1 || x >= data[y].length - 1) {
        return false;
    }
    return data[y][x].updateType() === undefined;
};

const createMaze = (data) => {
    let visited = [];
    let position = [0, 0];
    do {
        visited.push(position);
    } while (visited.length > 0);
    return data;
};

const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min; // inc min, exc max
