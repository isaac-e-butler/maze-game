import { bgLayer, enemyLayer, playerLayer } from './renderer.js';
import { objectConfig } from '../config/object.config.js';

export const objectData = {
    roomTitle: '',
    walls: {
        src: objectConfig.wall.src,
        layer: bgLayer,
        collection: [],
    },
    enemy: {
        src_full: objectConfig.enemy.src_full,
        src_half: objectConfig.enemy.src_half,
        src_low: objectConfig.enemy.src_low,
        hp: objectConfig.enemy.hp,
        layer: enemyLayer,
        collection: [],
    },
    player: {
        src: objectConfig.player.src,
        layer: playerLayer,
        object: undefined,
        hasWeapon: false,
        alive: false,
        x: undefined,
        y: undefined,
    },
    weapon: {
        src: objectConfig.weapon.src,
        layer: bgLayer,
        x: undefined,
        y: undefined,
    },
    treasure: {
        src: objectConfig.treasure.src,
        layer: bgLayer,
        collection: [],
    },
    ready: false,
    won: false,
};
