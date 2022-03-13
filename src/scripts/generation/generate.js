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
            row.push(new Block(x, y, undefined, blockCollection.pixel));
        }
        blockCollection.data.push(row);
    }
    blockCollection.data = createMaze(blockCollection.data);
}

function createMaze(data) {
    return data;
}
