import { objectConfig } from '../config/object.config.js';
import * as input from './input.js';
import { data } from './data.js';
import * as _ from './common.js';

export const miscLayer = _.getContext2D('misc-layer');
export const enemyLayer = _.getContext2D('enemy-layer');
export const playerLayer = _.getContext2D('player-layer');
const roomTitle = document.getElementById('maze-title');
const progressValue = document.getElementById('progress-value');

export const singular = object => {
    const image = new Image();
    image.onload = () => {
        object.layer.drawImage(image, object.x, object.y);
    };
    image.src = object.src;
};

const numerous = object => {
    const image = new Image();
    image.onload = () => {
        object.layer.fillStyle = object.layer.createPattern(image, 'repeat');
        object.collection.forEach(data => {
            object.layer.fillRect(data.x, data.y, _.objectSize, _.objectSize);
        });
    };
    image.src = object.src;
};

export const clearSingular = object => {
    object.layer.clearRect(object.x, object.y, _.objectSize, _.objectSize);
};

export const clearCanvas = layer => {
    layer.clearRect(0, 0, _.stageSize, _.stageSize);
};

const getEnemyImageSource = health => {
    const healthSection = objectConfig.enemy.hp / 3;

    if (health >= healthSection * 3) return data.enemy.src_full;
    if (health >= healthSection * 2) return data.enemy.src_half;
    return data.enemy.src_low;
};

export const enemies = () => {
    clearCanvas(data.enemy.layer);
    data.enemy.collection.forEach(enemy => {
        const image = new Image();
        image.onload = () => {
            data.enemy.layer.drawImage(image, enemy.x, enemy.y);
        };
        image.src = getEnemyImageSource(enemy.hp);
    });
};

export const enabled = (htmlObject, enable = true) => {
    if (enable) {
        htmlObject.removeAttribute('disabled');
    } else {
        htmlObject.setAttribute('disabled', '');
    }
};

export const updateBtn = (btn, update, enable = true) => {
    btn.setAttribute('title', `${update.title}  -  ${input.getFormattedCode(btn)}`);
    btn.children[0].src = update.src;
    enabled(btn, enable);
};

export const updateBtnMultiple = objects => {
    objects.map(object => enabled(object.btn, object.enable));
};

export const updateRoomTitle = title => {
    roomTitle.setAttribute('maze-title', title);
    roomTitle.innerHTML = title;
};

export const progress = override => {
    const total = data.player.treasure + data.treasure.collection.length;
    const percentage = override ?? Math.round((data.player.treasure / total) * 10000) / 100;

    progressValue.style.setProperty('--progress-width', percentage);
    progressValue.setAttribute('value', `${percentage}%`);
    if (percentage === 100) data.won = true;
};

const setup = () => {
    clearCanvas(miscLayer);
    clearCanvas(enemyLayer);
    clearCanvas(playerLayer);
    updateRoomTitle(data.roomTitle);
};

export const room = () => {
    setup();
    numerous(data.walls);
    numerous(data.treasure);
    singular(data.weapon);
    singular(data.player);
    enemies();
};
