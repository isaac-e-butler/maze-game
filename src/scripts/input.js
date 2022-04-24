import { objectData } from './object-data.js';

const inputListener = (event) => objectData.player.object.handleInput(event);

const list = [
    { code: 'KeyW', btn: undefined },
    { code: 'KeyA', btn: undefined },
    { code: 'KeyS', btn: undefined },
    { code: 'KeyD', btn: undefined },
    { code: 'KeyK', btn: undefined },
    { code: 'KeyL', btn: undefined },
];

export const setup = () => {
    document.addEventListener('keydown', inputListener);
    document.addEventListener('keyup', inputListener);

    list.map((input) => {
        input.btn = document.getElementById(input.code);

        input.btn.onmousedown = () => inputListener({ ...input, type: 'keydown' });
        input.btn.onmouseup = () => inputListener({ ...input, type: 'keyup' });

        return input;
    });
};

export const getBtn = (code) => {
    for (let i = 0; i < list.length; i++) {
        const input = list[i];

        if (code === input.code) {
            return input.btn;
        }
    }
};
