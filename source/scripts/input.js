import { inputConfig } from '../config/input.config.js';
import * as roomSelect from './room-select.js';
import { data, status } from './data.js';
import { updateBtnMultiple } from './renderer.js';

let inputReady = true;
export const controls = [
    { id: 'up', code: inputConfig.keyCode.up, btn: undefined },
    { id: 'left', code: inputConfig.keyCode.left, btn: undefined },
    { id: 'down', code: inputConfig.keyCode.down, btn: undefined },
    { id: 'right', code: inputConfig.keyCode.right, btn: undefined },
    { id: 'action1', code: inputConfig.keyCode.action1, btn: undefined },
    { id: 'action2', code: inputConfig.keyCode.action2, btn: undefined },
];

const inputListener = event => {
    const keyDown = event.type === 'keydown';
    const keyUp = event.type === 'keyup';

    const displayInput = () => {
        const pressed = 'pressed';

        if (!event.btn) event.btn = getBtn(event.code);

        if (event.btn) {
            if (keyDown && !event.btn.hasAttribute('disabled') && !event.btn.classList.contains(pressed)) {
                event.btn.classList.add(pressed);
            }
            if (keyUp && event.btn.classList.contains(pressed)) {
                event.btn.classList.remove(pressed);
            }
        }
    };

    const limit = delay => {
        if (inputReady) {
            inputReady = false;
            setTimeout(() => {
                inputReady = true;
            }, delay);
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
                limit(200);
                break;
            case status.playing:
                data.player.object.handleInput(event);
                limit(75);
                break;
            default:
                break;
        }
    }
};

export const setup = () => {
    document.addEventListener('keydown', inputListener);
    document.addEventListener('keyup', inputListener);

    controls.map(control => {
        const btn = document.getElementById(control.id);

        btn.onpointerdown = () => inputListener({ ...control, type: 'keydown' });
        btn.onpointerleave = () => inputListener({ ...control, type: 'keyup' });
        btn.onpointerup = () => inputListener({ ...control, type: 'keyup' });

        control.btn = btn;
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
    for (let i = 0; i < controls.length; i++) {
        if (info === controls[i].id || info === controls[i].code) return controls[i].btn;
    }
};

export const getFormattedCode = btn => {
    for (let i = 0; i < controls.length; i++) {
        if (btn === controls[i].btn)
            return controls[i].code
                .replace(/([A-Z])/g, ' $1')
                .toUpperCase()
                .trim();
    }
};
