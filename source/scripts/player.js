import { inputConfig } from '../config/input.config.js';
import * as renderer from './renderer.js';
import { data, status } from './data.js';
import * as input from './input.js';
import * as _ from './common.js';

export const spawn = () => {
    renderer.updateBtn(input.getBtn('action1'), inputConfig.action.attack, false);
    renderer.updateBtn(input.getBtn('action2'), inputConfig.action.pickup);
    renderer.updateBtnMultiple([
        { btn: input.getBtn('up'), enable: true },
        { btn: input.getBtn('left'), enable: true },
        { btn: input.getBtn('down'), enable: true },
        { btn: input.getBtn('right'), enable: true },
    ]);

    data.player.object = new Player();
};

export const despawn = () => {
    renderer.updateBtn(input.getBtn('action1'), inputConfig.action.unassigned, false);
    renderer.updateBtn(input.getBtn('action2'), inputConfig.action.reload);
    renderer.updateBtnMultiple([
        { btn: input.getBtn('up'), enable: false },
        { btn: input.getBtn('left'), enable: false },
        { btn: input.getBtn('down'), enable: false },
        { btn: input.getBtn('right'), enable: false },
    ]);
    input.controls.forEach(control => control.btn.classList.remove('pressed'));

    data.status = status.selecting;
};

class Player {
    constructor() {
        data.player.hasWeapon = false;
        data.player.alive = true;
        data.player.treasure = 0;
        this.y = data.player.y;
        this.x = data.player.x;
    }

    handleInput(event) {
        switch (event.code) {
            case inputConfig.keyCode.up:
                this.movement(0, -_.objectSize);
                break;
            case inputConfig.keyCode.left:
                this.movement(-_.objectSize, 0);
                break;
            case inputConfig.keyCode.down:
                this.movement(0, _.objectSize);
                break;
            case inputConfig.keyCode.right:
                this.movement(_.objectSize, 0);
                break;
            case inputConfig.keyCode.action1:
                this.attack();
                break;
            case inputConfig.keyCode.action2:
                this.interact();
                break;
            default:
                break;
        }
    }

    interact() {
        if (!data.player.hasWeapon) {
            const canCollectWeapon = _.withinArea(this.x, this.y, data.weapon);

            if (canCollectWeapon) {
                data.player.hasWeapon = true;
                renderer.clearSingular(data.weapon);
                renderer.enabled(input.getBtn('action1'));
            }
        }

        data.treasure.collection = data.treasure.collection
            .map(treasure => {
                const canCollectTreasure = _.withinArea(this.x, this.y, treasure);

                if (canCollectTreasure) {
                    renderer.clearSingular({
                        ...treasure,
                        layer: data.treasure.layer,
                    });
                    data.player.treasure += 1;
                    treasure.collected = true;
                }

                return treasure;
            })
            .filter(treasure => !treasure.collected);

        renderer.progress();
    }

    attack() {
        if (data.player.hasWeapon) {
            let shouldRender = false;

            data.enemy.collection = data.enemy.collection
                .map(enemy => {
                    const canAttack = _.withinArea(this.x, this.y, enemy);

                    if (canAttack) {
                        shouldRender = true;
                        enemy.hp -= 1;
                    }

                    return enemy;
                })
                .filter(enemy => {
                    const dead = enemy.hp <= 0;
                    return !dead;
                });

            if (shouldRender) renderer.enemies(); // lazy approach
        }
    }

    isTouchingEnemy() {
        data.enemy.collection.map(enemy => {
            if (_.isTouching(this.x, this.y, enemy)) {
                data.player.alive = false;
            }
        });
    }

    movement(x_dir, y_dir) {
        this.isTouchingEnemy();
        if (data.player.alive) {
            const blocked = data.walls.collection.some(({ x, y }) => {
                return x === this.x + x_dir && y === this.y + y_dir;
            });

            if (!blocked) {
                this.x += x_dir;
                this.y += y_dir;
                this.x = _.restrict(this.x);
                this.y = _.restrict(this.y);
                renderer.clearCanvas(data.player.layer);
                renderer.singular({ ...data.player, x: this.x, y: this.y });
            }
        }
    }
}
