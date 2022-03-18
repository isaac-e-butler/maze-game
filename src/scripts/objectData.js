import config from './object-config.json' assert { type: 'json' };
import { bgLayer, enemyLayer, playerLayer } from './renderer.js';

export const objectData = {
    ready: false,
    won: false,
    roomTitle: '',
    walls: {
        src: config.wall.src,
        layer: bgLayer,
        collection: [],
    },
    player: {
        src: config.player.src,
        layer: playerLayer,
        x: undefined,
        y: undefined,
        prev: undefined,
        hasWeapon: false,
        object: undefined,
        alive: false,
    },
    enemy: {
        src_full: config.enemy.src_full,
        src_half: config.enemy.src_half,
        src_low: config.enemy.src_low,
        start_hp: config.enemy.start_hp,
        layer: enemyLayer,
        collection: [],
    },
    weapon: {
        src: config.weapon.src,
        layer: playerLayer,
        x: undefined,
        y: undefined,
        pickedUp: false,
    },
    treasure: {
        src: config.treasure.src,
        layer: bgLayer,
        collection: [],
    },
};
