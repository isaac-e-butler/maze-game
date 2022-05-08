import { data } from './data.js';
import * as _ from './common.js';

export class enemyObject {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.hp = data.hp;
    }

    isTouchingPlayer() {
        if (_.isTouching(this.x, this.y, data.player.object)) {
            data.player.alive = false;
        }
    }

    isBlocked(direction) {
        return data.walls.collection.some(({ x, y }) => {
            return x === this.x + direction.x && y === this.y + direction.y;
        });
    }

    getDirections() {
        const directions = [
            { x: -_.objectSize, y: 0 },
            { x: _.objectSize, y: 0 },
            { x: 0, y: -_.objectSize },
            { x: 0, y: _.objectSize },
            { x: 0, y: 0 },
        ];
        return directions.filter((direction) => {
            if (!this.isBlocked(direction)) return direction;
        });
    }

    move() {
        if (this.hp > 0) {
            this.isTouchingPlayer();

            const directions = this.getDirections();
            const direction = directions[_.randomInt(0, directions.length - 1)];

            this.x += direction.x;
            this.y += direction.y;
            this.x = _.restrict(this.x);
            this.y = _.restrict(this.y);
        }
    }
}
