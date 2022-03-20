import { objectConfig } from './object.config.js';
import { objectData } from './objectData.js';
import {
    x_diff,
    y_diff,
    restrictNegative,
    restrictPositive,
    randomInt,
} from './common.js';
import { RenderEnemies } from './renderer.js';

export class Enemy {
    constructor(enemyData) {
        this.hp = objectConfig.enemy.start_hp;
        this.y = enemyData.y;
        this.x = enemyData.x;
        this.prev = {};
        this.alive = true;
    }

    restrictMovement() {
        this.x = restrictNegative(this.x);
        this.y = restrictNegative(this.y);
        this.x = restrictPositive(this.x);
        this.y = restrictPositive(this.y);
    }

    touchingPlayer() {
        if (
            x_diff(this.x, objectData.player) === 0 &&
            y_diff(this.y, objectData.player) === 0
        ) {
            objectData.player.alive = false;
        }
    }

    move() {
        this.alive = this.hp > 0;
        if (this.alive) {
            this.touchingPlayer();

            const axis = randomInt(0, 1) === 1 ? 'y' : 'x';
            const movement = randomInt(-1, 1) * objectConfig.size;
            const x_dir = axis === 'x' ? movement : 0;
            const y_dir = axis === 'y' ? movement : 0;

            const blocked = objectData.walls.collection.some(({ x, y }) => {
                return x === this.x + x_dir && y === this.y + y_dir;
            });
            if (!blocked) {
                this.prev = { x: this.x, y: this.y };
                this.x += x_dir;
                this.y += y_dir;
                this.restrictMovement();
                RenderEnemies();
            }
        }
    }
}
