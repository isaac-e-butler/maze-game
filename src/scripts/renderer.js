import { objectConfig } from '../config/object.config.js';
import { objectData } from './object-data.js';
import * as _ from './common.js';

export const miscLayer = document.getElementById('misc-layer').getContext('2d');
export const enemyLayer = document.getElementById('enemy-layer').getContext('2d');
export const playerLayer = document.getElementById('player-layer').getContext('2d');

const roomTitle = document.getElementById('room-title');
const progressBar = document.getElementById('progress');
const playBtn = document.getElementById('play-btn');
const screen = document.getElementById('screen');
const statusText = document.getElementById('status-text');

export function singular(object) {
    const image = new Image();
    image.onload = () => {
        object.layer.drawImage(image, object.x, object.y);
    };
    image.src = object.src;
}

function numerous(object) {
    const image = new Image();
    image.onload = () => {
        object.layer.fillStyle = object.layer.createPattern(image, 'repeat');
        object.collection.forEach((data) => {
            object.layer.fillRect(data.x, data.y, _.objectSize, _.objectSize);
        });
    };
    image.src = object.src;
}

export function singularClear(object) {
    object.layer.clearRect(object.x, object.y, _.objectSize, _.objectSize);
}

function setup() {
    roomTitle.innerHTML = objectData.roomTitle;
    roomTitle.setAttribute('roomTitle', objectData.roomTitle);
    progressBar.setAttribute('max', objectData.treasure.collection.length);
    screen.style.visibility = 'hidden';
    statusText.innerHTML = '';
}

export function incProgress() {
    progressBar.setAttribute('value', parseInt(progressBar.getAttribute('value')) + 1);
}

export function endScreen(text) {
    statusText.innerHTML = text;
    playBtn.innerHTML = 'RELOAD';
    statusText.style.visibility = 'visible';
    screen.style.visibility = 'visible';
}

function getEnemyImageSource(health) {
    const healthSection = objectConfig.enemy.hp / 3;

    if (health >= healthSection * 3) return objectData.enemy.src_full;
    if (health >= healthSection * 2) return objectData.enemy.src_half;
    return objectData.enemy.src_low;
}

export function enemies() {
    objectData.enemy.layer.clearRect(0, 0, _.stageSize, _.stageSize);
    objectData.enemy.collection.forEach((enemy) => {
        const image = new Image();
        image.onload = () => {
            objectData.enemy.layer.drawImage(image, enemy.x, enemy.y);
        };
        image.src = getEnemyImageSource(enemy.hp);
    });
}

export function room() {
    setup();
    numerous(objectData.walls);
    numerous(objectData.treasure);
    singular(objectData.weapon);
    singular(objectData.player);
    enemies();
}
