import { miscLayer, enemyLayer, playerLayer } from './renderer.js';
import { objectConfig } from '../config/object.config.js';

export const status = {
    powering: 0,
    selecting: 1,
    playing: 2,
};

export const data = {
    roomTitle: '',
    player: {
        src: objectConfig.player.src,
        layer: playerLayer,
        object: undefined,
        hasWeapon: false,
        alive: false,
        x: undefined,
        y: undefined,
    },
    enemy: {
        src_full: objectConfig.enemy.src_full,
        src_half: objectConfig.enemy.src_half,
        src_low: objectConfig.enemy.src_low,
        hp: objectConfig.enemy.hp,
        layer: enemyLayer,
        collection: [],
    },
    walls: {
        src: objectConfig.wall.src,
        layer: miscLayer,
        collection: [],
    },
    weapon: {
        src: objectConfig.weapon.src,
        layer: miscLayer,
        x: undefined,
        y: undefined,
    },
    treasure: {
        src: objectConfig.treasure.src,
        layer: miscLayer,
        collection: [],
    },
    interval: undefined,
    status: undefined,
    won: false,
};
