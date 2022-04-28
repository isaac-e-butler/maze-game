import { objectData } from './object-data.js';

const inputListener = (event) => objectData.player.object.handleInput(event);

export const list = [
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

    list.map((inputEvent) => {
        const btn = document.getElementById(inputEvent.code);

        btn.onmousedown = () => inputListener({ ...inputEvent, type: 'keydown' });
        btn.onmouseup = () => inputListener({ ...inputEvent, type: 'keyup' });

        inputEvent.btn = btn;
    });
};

export const getBtn = (code) => {
    for (let i = 0; i < list.length; i++) {
        const input = list[i];

        if (code === input.code) return input.btn;
    }
};
