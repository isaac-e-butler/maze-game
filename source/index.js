import { data, status } from './scripts/data.js';
import * as input from './scripts/input.js';
import * as renderer from './scripts/renderer.js';
import { inputConfig } from './config/input.config.js';
import { mazeConfig } from './config/maze.config.js';

const configureTestRooms = () => {
    if (window.location.port === '3000' && window.location.hostname === 'localhost') {
        mazeConfig.rooms = [...mazeConfig.cypressRooms, ...mazeConfig.rooms];
    }
};

const start = () => {
    input.setup();
    data.status = status.powering;
    renderer.updateBtn(input.getBtn('action1'), inputConfig.action.unassigned, false);
    renderer.updateBtn(input.getBtn('action2'), inputConfig.action.start);
};

configureTestRooms();
start();
