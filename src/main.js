import config from './maze-config.json' assert { type: 'json' };
import { objectData } from './scripts/objectData.js';
import SetObjectData from './scripts/setObjectData.js';
import RenderRoom, { ShowEndScreen } from './scripts/renderer.js';
import { SpawnPlayer } from './scripts/player.js';
import { randomInt } from './scripts/common.js';

const playBtn = document.getElementById('play-btn');
let interval;

export default function Main() {
    const waitUntilLoaded = () => {
        if (!objectData.ready) {
            playBtn.onclick = () => {
                Play();
            };
        } else {
            setTimeout(waitUntilLoaded);
        }
    };
    SetObjectData(config.rooms[randomInt(0, config.rooms.length - 1)]);
    waitUntilLoaded();
}

function Update() {
    objectData.enemy.collection.forEach((enemy) => {
        enemy.move();
    });
    if (objectData.won) {
        ShowEndScreen('YOU WON!');
        clearInterval(interval);
        playBtn.onclick = () => location.reload();
    }
    if (!objectData.player.alive) {
        ShowEndScreen('YOU DIED!');
        clearInterval(interval);
        playBtn.onclick = () => location.reload();
    }
}

function Play() {
    RenderRoom();
    SpawnPlayer(objectData.player);
    interval = setInterval(Update, 200);
}

// Main();
