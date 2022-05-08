import { inputConfig } from '../config/input.config.js';
import * as roomSelect from './room-select.js';
import { data, status } from './data.js';

export const list = [
    { id: 'up', code: inputConfig.keys.up, btn: undefined },
    { id: 'left', code: inputConfig.keys.left, btn: undefined },
    { id: 'down', code: inputConfig.keys.down, btn: undefined },
    { id: 'right', code: inputConfig.keys.right, btn: undefined },
    { id: 'action1', code: inputConfig.keys.action1, btn: undefined },
    { id: 'action2', code: inputConfig.keys.action2, btn: undefined },
];

let inputReady = true;

const inputListener = (event) => {
    const keyDown = event.type === 'keydown';
    const keyUp = event.type === 'keyup';

    const displayInput = () => {
        const pressed = ' pressed';

        if (!event.btn) event.btn = getBtn(event.code);

        if (event.btn) {
            if (keyDown && !event.btn.hasAttribute('disabled')) {
                if (!event.btn.className.includes(pressed))
                    event.btn.className += pressed;
            }
            if (keyUp) {
                if (event.btn.className.includes(pressed))
                    event.btn.className = event.btn.className.replace(pressed, '');
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
                if (event.code === inputConfig.keys.action2) {
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

    list.map((event) => {
        const btn = document.getElementById(event.id);

        btn.onmousedown = () => inputListener({ ...event, type: 'keydown' });
        btn.onmouseup = () => inputListener({ ...event, type: 'keyup' });

        event.btn = btn;
    });
};

export const getBtn = (info) => {
    for (let i = 0; i < list.length; i++) {
        const input = list[i];

        if (info === input.id || info === input.code) return input.btn;
    }
};

export const getFormattedCode = (btn) => {
    for (let i = 0; i < list.length; i++) {
        const input = list[i];

        if (btn === input.btn)
            return input.code
                .replace(/([A-Z])/g, ' $1')
                .toUpperCase()
                .trim();
    }
};
