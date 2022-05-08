import { data, status } from './scripts/data.js';
import * as input from './scripts/input.js';
import * as renderer from './scripts/renderer.js';
import { inputConfig } from './config/input.config.js';
import { mazeConfig } from './config/maze.config.js';

const protocol = () => {
    if (
        window.location.protocol === 'http:' &&
        window.location.hostname === 'maze.ghostrunners25.com'
    ) {
        window.location.href = window.location.href.replace('http:', 'https:');
    } else if (window.location.port === '3001') {
        mazeConfig.rooms = [...mazeConfig.rooms, ...mazeConfig.cypressRooms];
    }
};

const start = () => {
    input.setup();
    data.status = status.powering;
    renderer.updateBtn(input.getBtn('action1'), inputConfig.buttons.unassigned, false);
    renderer.updateBtn(input.getBtn('action2'), inputConfig.buttons.start);
};

protocol();
start();
