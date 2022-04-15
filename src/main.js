import setObjectData from './scripts/set-object-data.js';
import { objectData } from './scripts/object-data.js';
import { mazeConfig } from './config/maze.config.js';
import * as render from './scripts/renderer.js';
import * as player from './scripts/player.js';
import * as _ from './scripts/common.js';

const playBtn = document.getElementById('play-btn');
let interval;

function start() {
    const waitUntilLoaded = () => {
        if (!objectData.ready) {
            playBtn.onclick = () => {
                play();
            };
        } else {
            setTimeout(waitUntilLoaded);
        }
    };
    setObjectData(mazeConfig.rooms[_.randomInt(0, mazeConfig.rooms.length - 1)]);
    waitUntilLoaded();
}

function update() {
    objectData.enemy.collection.forEach((enemy) => {
        enemy.move();
    });
    render.enemies();

    if (objectData.won) {
        render.endScreen('YOU WON!');
        clearInterval(interval);
        playBtn.onclick = () => location.reload();
    }
    if (!objectData.player.alive) {
        render.endScreen('YOU DIED!');
        clearInterval(interval);
        playBtn.onclick = () => location.reload();
    }
}

function play() {
    render.room();
    player.spawn();
    interval = setInterval(update, 200);
}

start();
