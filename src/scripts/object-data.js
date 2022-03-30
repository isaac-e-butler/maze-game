import { objectConfig } from '../config/object.config.js';
import { bgLayer, enemyLayer, playerLayer } from './renderer.js';

export const objectData = {
    ready: false,
    won: false,
    roomTitle: '',
    walls: {
        src: objectConfig.wall.src,
        layer: bgLayer,
        collection: [],
    },
    player: {
        src: objectConfig.player.src,
        layer: playerLayer,
        x: undefined,
        y: undefined,
        prev: undefined,
        hasWeapon: false,
        object: undefined,
        alive: false,
    },
    enemy: {
        src_full: objectConfig.enemy.src_full,
        src_half: objectConfig.enemy.src_half,
        src_low: objectConfig.enemy.src_low,
        start_hp: objectConfig.enemy.start_hp,
        layer: enemyLayer,
        collection: [],
    },
    weapon: {
        src: objectConfig.weapon.src,
        layer: playerLayer,
        x: undefined,
        y: undefined,
        pickedUp: false,
    },
    treasure: {
        src: objectConfig.treasure.src,
        layer: bgLayer,
        collection: [],
    },
};
