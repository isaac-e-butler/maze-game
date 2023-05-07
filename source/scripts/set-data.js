import { objectConfig } from '../config/object.config.js';
import * as renderer from './renderer.js';
import { enemyObject } from './enemy.js';
import { data } from './data.js';
import * as _ from './common.js';

const mapImage = document.getElementById('map-image').getContext('2d', { willReadFrequently: true });
const mapSize = 31;

export const setData = room => {
    renderer.clearCanvas(mapImage);
    const image = new Image();
    clear();

    image.onload = () => {
        mapImage.drawImage(image, 0, 0);
        const pixelData = mapImage.getImageData(0, 0, mapSize, mapSize).data;

        for (let i = 0; i < pixelData.length; i += 4) {
            const colour = {
                red: pixelData[i],
                green: pixelData[i + 1],
                blue: pixelData[i + 2],
                alpha: pixelData[i + 3],
            };

            if (colour.alpha) {
                const pixelIndex = i / 4;
                const y = Math.floor(pixelIndex / mapSize) * _.objectSize;
                const x = (pixelIndex % mapSize) * _.objectSize;
                identifyObject(colour, x, y);
            }
        }

        renderer.room();
    };

    data.roomTitle = room.title;
    image.src = room.src;
};

const identifyObject = (colour, x, y) => {
    if (colourMatches(colour, objectConfig.wall)) {
        data.walls.collection.push({ x, y });
    } else if (colourMatches(colour, objectConfig.player)) {
        data.player = { ...data.player, x, y };
    } else if (colourMatches(colour, objectConfig.weapon)) {
        data.weapon = { ...data.weapon, x, y };
    } else if (colourMatches(colour, objectConfig.treasure)) {
        data.treasure.collection.push({
            collected: false,
            x,
            y,
        });
    } else if (colourMatches(colour, objectConfig.enemy)) {
        data.enemy.collection.push(
            new enemyObject({
                hp: data.enemy.hp,
                x,
                y,
            })
        );
    }
};

const clear = () => {
    data.won = false;
    data.weapon.x = undefined;
    data.weapon.y = undefined;
    data.walls.collection = [];
    data.enemy.collection = [];
    data.treasure.collection = [];
};

const colourMatches = (colour, object) =>
    colour.red === object.red && colour.green === object.green && colour.blue === object.blue;
