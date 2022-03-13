import Cell from './generation/block.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function Main() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, 256, 256);
}

Main();
