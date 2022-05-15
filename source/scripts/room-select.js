import { inputConfig } from '../config/input.config.js';
import { mazeConfig } from '../config/maze.config.js';
import * as renderer from './renderer.js';
import { data, status } from './data.js';
import { setData } from './set-data.js';
import * as player from './player.js';
import * as input from './input.js';

let index = 0;

export const start = () => {
    renderer.updateBtn(input.getBtn('action2'), inputConfig.action.play);
    renderer.updateBtnMultiple([
        { btn: input.getBtn('up'), enable: false },
        { btn: input.getBtn('left'), enable: true },
        { btn: input.getBtn('down'), enable: false },
        { btn: input.getBtn('right'), enable: true },
    ]);
    show(0);
};

const show = (updateIndex) => {
    index += updateIndex;
    if (index < 0) index = mazeConfig.rooms.length - 1;
    if (index >= mazeConfig.rooms.length) index = 0;

    setData(mazeConfig.rooms[index]);
};

const select = () => {
    data.status = status.playing;
    player.spawn();

    const update = () => {
        if (data.won || !data.player.alive) {
            renderer.updateRoomTitle(`YOU ${data.won ? 'WON' : 'LOST'}`);
            clearInterval(data.interval);
            player.despawn();
        } else {
            data.enemy.collection.map((enemy) => {
                enemy.move();
            });
            renderer.enemies();
        }
    };

    data.interval = setInterval(update, 200);
};

export const handleInput = (event) => {
    if (!data.player.object) {
        switch (event.code) {
            case inputConfig.keyCode.left:
                show(-1);
                break;
            case inputConfig.keyCode.right:
                show(1);
                break;
            case inputConfig.keyCode.action2:
                select();
                break;
            default:
                break;
        }
    } else if (event.code === inputConfig.keyCode.action2) {
        data.player.object = undefined;
        start();
    }
};
