import { objectConfig } from '../config/object.config.js';
import { objectData } from './object-data.js';
import { Enemy } from './enemy.js';

const imageMap = document.getElementById('image-map').getContext('2d');
const mapSize = 31;

export default function SetObjectData(room) {
    imageMap.clearRect(0, 0, mapSize, mapSize);
    const image = new Image();
    image.onload = () => {
        imageMap.drawImage(image, 0, 0);
        const { data } = imageMap.getImageData(0, 0, mapSize, mapSize);
        for (let i = 0; i < data.length; i += 4) {
            const colour = {
                red: data[i],
                green: data[i + 1],
                blue: data[i + 2],
                alpha: data[i + 3],
            };
            if (colour.alpha) {
                const currentPixel = i / 4;
                const y =
                    Math.floor(currentPixel / mapSize) * objectConfig.size;
                const x = (currentPixel % mapSize) * objectConfig.size;

                ObjectIdentifier(colour, x, y);
            }
        }
        objectData.ready = true;
    };
    image.src = room.src;
    objectData.roomTitle = room.title;
}

function ObjectIdentifier(colour, x, y) {
    if (MatchesObject(colour, objectConfig.wall)) {
        objectData.walls.collection.push({ x, y });
    } else if (MatchesObject(colour, objectConfig.player)) {
        objectData.player = { ...objectData.player, x, y };
    } else if (MatchesObject(colour, objectConfig.weapon)) {
        objectData.weapon = { ...objectData.weapon, x, y };
    } else if (MatchesObject(colour, objectConfig.treasure)) {
        objectData.treasure.collection.push({
            x,
            y,
            pickedUp: false,
        });
    } else if (MatchesObject(colour, objectConfig.enemy)) {
        objectData.enemy.collection.push(
            new Enemy({
                x,
                y,
            })
        );
    }
}

const MatchesObject = (colour, object) =>
    colour.red === object.red &&
    colour.green === object.green &&
    colour.blue === object.blue;
