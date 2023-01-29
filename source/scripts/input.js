import { inputConfig } from '../config/input.config.js';
import * as roomSelect from './room-select.js';
import { data, status } from './data.js';
import { updateBtnMultiple } from './renderer.js';

export const list = [
    { id: 'up', code: inputConfig.keyCode.up, btn: undefined },
    { id: 'left', code: inputConfig.keyCode.left, btn: undefined },
    { id: 'down', code: inputConfig.keyCode.down, btn: undefined },
    { id: 'right', code: inputConfig.keyCode.right, btn: undefined },
    { id: 'action1', code: inputConfig.keyCode.action1, btn: undefined },
    { id: 'action2', code: inputConfig.keyCode.action2, btn: undefined },
];

let inputReady = true;

const inputListener = event => {
    const keyDown = event.type === 'keydown';
    const keyUp = event.type === 'keyup';

    const displayInput = () => {
        const pressed = 'pressed';

        if (!event.btn) event.btn = getBtn(event.code);

        if (event.btn) {
            if (keyDown && !event.btn.hasAttribute('disabled')) {
                if (!event.btn.classList.contains(pressed)) event.btn.classList.add(pressed);
            }
            if (keyUp) {
                if (event.btn.classList.contains(pressed)) event.btn.classList.remove(pressed);
            }
        }
    };

    const limit = () => {
        if (inputReady) {
            inputReady = false;
            setTimeout(() => {
                inputReady = true;
            }, 75);
        }
    };

    displayInput();

    if (keyDown && inputReady) {
        switch (data.status) {
            case status.powering:
                if (event.code === inputConfig.keyCode.action2) {
                    data.status = status.selecting;
                    roomSelect.start();
                }
                break;
            case status.selecting:
                roomSelect.handleInput(event);
                break;
            case status.playing:
                data.player.object.handleInput(event);
                break;
            default:
                break;
        }
        limit();
    }
};

export const setup = () => {
    document.addEventListener('keydown', inputListener);
    document.addEventListener('keyup', inputListener);

    list.map(event => {
        const btn = document.getElementById(event.id);

        btn.onmousedown = () => inputListener({ ...event, type: 'keydown' });
        btn.onmouseup = () => inputListener({ ...event, type: 'keyup' });

        event.btn = btn;
    });

    updateBtnMultiple([
        { btn: getBtn('up'), enable: false },
        { btn: getBtn('left'), enable: false },
        { btn: getBtn('down'), enable: false },
        { btn: getBtn('right'), enable: false },
        { btn: getBtn('action1'), enable: false },
        { btn: getBtn('action2'), enable: false },
    ]);
};

export const getBtn = info => {
    for (let i = 0; i < list.length; i++) {
        const input = list[i];

        if (info === input.id || info === input.code) return input.btn;
    }
};

export const getFormattedCode = btn => {
    for (let i = 0; i < list.length; i++) {
        const input = list[i];

        if (btn === input.btn)
            return input.code
                .replace(/([A-Z])/g, ' $1')
                .toUpperCase()
                .trim();
    }
};
