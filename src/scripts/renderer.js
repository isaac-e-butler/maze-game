import { objectConfig } from '../config/object.config.js';
import { objectData } from './object-data.js';

export const bgLayer = document.getElementById('bg-layer').getContext('2d');
export const enemyLayer = document
    .getElementById('enemy-layer')
    .getContext('2d');
export const playerLayer = document
    .getElementById('player-layer')
    .getContext('2d');
const roomTitle = document.getElementById('room-title');
const progressBar = document.getElementById('progress');
const playBtn = document.getElementById('play-btn');
const screen = document.getElementById('screen');
const statusText = document.getElementById('status-text');
const stage = 310;

function RenderSingular(object) {
    ClearSingular(object);
    const image = new Image();
    image.onload = () => {
        object.layer.drawImage(image, object.x, object.y);
    };
    image.src = object.src;
}

export function ClearSingular(object) {
    object.layer.clearRect(
        object.prev ? object.prev.x : object.x,
        object.prev ? object.prev.y : object.y,
        objectConfig.size,
        objectConfig.size
    );
}

function RenderNumerous(object) {
    const image = new Image();
    image.onload = () => {
        object.layer.fillStyle = object.layer.createPattern(image, 'repeat');
        object.collection.forEach((data) => {
            object.layer.fillRect(
                data.x,
                data.y,
                objectConfig.size,
                objectConfig.size
            );
        });
    };
    image.src = object.src;
}

function SetInitial() {
    roomTitle.innerHTML = objectData.roomTitle;
    roomTitle.setAttribute('roomTitle', objectData.roomTitle);
    progressBar.setAttribute('max', objectData.treasure.collection.length);
    screen.style.visibility = 'hidden';
    statusText.innerHTML = '';
}

export function IncProgressBar() {
    progressBar.setAttribute(
        'value',
        parseInt(progressBar.getAttribute('value')) + 1
    );
}

export function ShowEndScreen(text) {
    statusText.innerHTML = text;
    playBtn.innerHTML = 'RELOAD';
    statusText.style.visibility = 'visible';
    screen.style.visibility = 'visible';
}

export function RenderPlayer() {
    RenderSingular(objectData.player);
    if (objectData.weapon.pickedUp) {
        ClearSingular(objectData.weapon);
    } else {
        RenderSingular(objectData.weapon);
    }
}

function RenderTreasure() {
    RenderNumerous(objectData.treasure);
}

function EnemyHealthSource(health) {
    const healthSections = objectConfig.enemy.start_hp / 3;
    if (health >= healthSections * 3) {
        return objectData.enemy.src_full;
    } else if (health >= healthSections * 2) {
        return objectData.enemy.src_half;
    } else {
        return objectData.enemy.src_low;
    }
}

export function RenderEnemies() {
    objectData.enemy.collection.forEach((enemy) => {
        objectData.enemy.layer.clearRect(
            enemy.prev ? enemy.prev.x : enemy.x,
            enemy.prev ? enemy.prev.y : enemy.y,
            objectConfig.size,
            objectConfig.size
        );
        const image = new Image();
        image.onload = () => {
            objectData.enemy.layer.drawImage(image, enemy.x, enemy.y);
        };
        image.src = EnemyHealthSource(enemy.hp);
    });
}

export function ClearAllEnemies() {
    objectData.enemy.layer.clearRect(0, 0, stage, stage);
}

export default function RenderRoom() {
    SetInitial();
    RenderNumerous(objectData.walls);
    RenderTreasure();
    RenderPlayer();
    RenderEnemies();
}
