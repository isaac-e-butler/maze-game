import { objectData } from './object-data.js';
import * as render from './renderer.js';
import * as input from './input.js';
import * as _ from './common.js';

const pressed = ' pressed';

export function spawn() {
    objectData.player.object = new Player();
    input.setup();
}

class Player {
    constructor() {
        objectData.player.alive = true;
        this.y = objectData.player.y;
        this.x = objectData.player.x;
        this.readyForInput = true;
    }

    handleInput(inputEvent) {
        const keyDown = inputEvent.type === 'keydown';
        const keyUp = inputEvent.type === 'keyup';
        if (keyDown) {
            switch (inputEvent.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.movement(0, -_.objectSize);
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.movement(-_.objectSize, 0);
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.movement(0, _.objectSize);
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.movement(_.objectSize, 0);
                    break;
                case 'KeyK':
                    this.attack();
                    break;
                case 'KeyL':
                    this.interact();
                    break;
                default:
                    break;
            }
        }
        if (!inputEvent.btn) inputEvent.btn = input.getBtn(inputEvent.code);
        this.showInput(inputEvent.btn, keyDown, keyUp);
        this.limitInput(keyDown);
    }

    limitInput(keyDown) {
        if (this.readyForInput && keyDown) {
            this.readyForInput = false;
            setTimeout(() => {
                this.readyForInput = true;
            }, 75);
        }
    }

    showInput(btn, keyDown, keyUp) {
        if (btn) {
            if (keyDown && !btn.hasAttribute('disabled')) {
                if (!btn.className.includes(pressed)) btn.className += pressed;
            }
            if (keyUp) {
                if (btn.className.includes(pressed))
                    btn.className = btn.className.replace(pressed, '');
            }
        }
    }

    interact() {
        if (!objectData.player.hasWeapon) {
            const canCollectWeapon = _.withinArea(this.x, this.y, objectData.weapon);

            if (canCollectWeapon) {
                objectData.player.hasWeapon = true;
                render.singularClear(objectData.weapon);
                input.getBtn('KeyK').removeAttribute('disabled');
            }
        }

        objectData.treasure.collection = objectData.treasure.collection
            .map((treasure) => {
                const canCollectTreasure = _.withinArea(this.x, this.y, treasure);

                if (canCollectTreasure) {
                    render.singularClear({
                        ...treasure,
                        layer: objectData.treasure.layer,
                    });
                    render.incProgress();
                    treasure.collected = true;
                }

                return treasure;
            })
            .filter((treasure) => {
                return !treasure.collected;
            });

        objectData.won = objectData.treasure.collection.length === 0;
    }

    attack() {
        if (objectData.player.hasWeapon) {
            let shouldRender = false;

            objectData.enemy.collection = objectData.enemy.collection
                .map((enemy) => {
                    const canAttack = _.withinArea(this.x, this.y, enemy);

                    if (canAttack) {
                        shouldRender = true;
                        enemy.hp -= 1;
                    }

                    return enemy;
                })
                .filter((enemy) => {
                    const dead = enemy.hp <= 0;
                    return !dead;
                });

            if (shouldRender) render.enemies(); // lazy approach
        }
    }

    isTouchingEnemy() {
        objectData.enemy.collection.map((enemy) => {
            if (_.isTouching(this.x, this.y, enemy)) {
                objectData.player.alive = false;
            }
        });
    }

    movement(x_dir, y_dir) {
        this.isTouchingEnemy();
        const inputReady = this.readyForInput && objectData.player.alive;
        if (inputReady) {
            const blocked = objectData.walls.collection.some(({ x, y }) => {
                return x === this.x + x_dir && y === this.y + y_dir;
            });

            if (!blocked) {
                render.singularClear({ ...objectData.player, x: this.x, y: this.y });
                this.x += x_dir;
                this.y += y_dir;
                this.x = _.restrict(this.x);
                this.y = _.restrict(this.y);
                render.singular({ ...objectData.player, x: this.x, y: this.y });
            }
        }
    }
}
