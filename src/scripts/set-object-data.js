import { objectConfig } from '../config/object.config.js';
import { objectData } from './object-data.js';
import { enemyObject } from './enemy.js';
import * as _ from './common.js';

export default function setObjectData(room) {
    const mapImage = document.getElementById('map-image').getContext('2d');
    const mapSize = 31;

    mapImage.clearRect(0, 0, mapSize, mapSize);
    const image = new Image();

    image.onload = () => {
        mapImage.drawImage(image, 0, 0);
        const { data } = mapImage.getImageData(0, 0, mapSize, mapSize);

        for (let i = 0; i < data.length; i += 4) {
            const colour = {
                red: data[i],
                green: data[i + 1],
                blue: data[i + 2],
                alpha: data[i + 3],
            };

            if (colour.alpha) {
                const pixelIndex = i / 4;
                const y = Math.floor(pixelIndex / mapSize) * _.objectSize;
                const x = (pixelIndex % mapSize) * _.objectSize;
                identifyObject(colour, x, y);
            }
        }

        objectData.ready = true;
    };

    objectData.roomTitle = room.title;
    image.src = room.src;
}

function identifyObject(colour, x, y) {
    if (sameColour(colour, objectConfig.wall)) {
        objectData.walls.collection.push({ x, y });
    } else if (sameColour(colour, objectConfig.player)) {
        objectData.player = { ...objectData.player, x, y };
    } else if (sameColour(colour, objectConfig.weapon)) {
        objectData.weapon = { ...objectData.weapon, x, y };
    } else if (sameColour(colour, objectConfig.treasure)) {
        objectData.treasure.collection.push({
            x,
            y,
            collected: false,
        });
    } else if (sameColour(colour, objectConfig.enemy)) {
        objectData.enemy.collection.push(
            new enemyObject({
                x,
                y,
                hp: objectData.enemy.hp,
            })
        );
    }
}

const sameColour = (colour, object) =>
    colour.red === object.red &&
    colour.green === object.green &&
    colour.blue === object.blue;
