import { objectData } from './object-data.js';
import * as _ from './common.js';

export class enemyObject {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.hp = data.hp;
    }

    isTouchingPlayer() {
        if (_.isTouching(this.x, this.y, objectData.player.object)) {
            objectData.player.alive = false;
        }
    }

    move() {
        if (this.hp > 0) {
            this.isTouchingPlayer();

            const axis = _.randomInt(0, 1) === 1 ? 'y' : 'x';
            const movement = _.randomInt(-1, 1) * _.objectSize;
            const x_dir = axis === 'x' ? movement : 0;
            const y_dir = axis === 'y' ? movement : 0;

            const blocked = objectData.walls.collection.some(({ x, y }) => {
                return x === this.x + x_dir && y === this.y + y_dir;
            });

            if (!blocked) {
                this.x += x_dir;
                this.y += y_dir;
                this.x = _.restrict(this.x);
                this.y = _.restrict(this.y);
            }
        }
    }
}
