import { objectData } from './object-data.js';
import * as render from './renderer.js';
import * as _ from './common.js';

const KeyW = document.getElementById('KeyW');
const KeyA = document.getElementById('KeyA');
const KeyS = document.getElementById('KeyS');
const KeyD = document.getElementById('KeyD');
const KeyK = document.getElementById('KeyK');
const KeyL = document.getElementById('KeyL');
const pressed = ' pressed';

export function spawn() {
    objectData.player.object = new Player();
    const InputListener = (event) => objectData.player.object.handleInput(event);

    const keyDown = 'keydown';
    const keyUp = 'keyup';

    document.addEventListener(keyDown, InputListener);
    document.addEventListener(keyUp, InputListener);
    KeyW.onmousedown = () => InputListener({ type: keyDown, code: 'KeyW' });
    KeyW.onmouseup = () => InputListener({ type: keyUp, code: 'KeyW' });

    KeyA.onmousedown = () => InputListener({ type: keyDown, code: 'KeyA' });
    KeyA.onmouseup = () => InputListener({ type: keyUp, code: 'KeyA' });

    KeyS.onmousedown = () => InputListener({ type: keyDown, code: 'KeyS' });
    KeyS.onmouseup = () => InputListener({ type: keyUp, code: 'KeyS' });

    KeyD.onmousedown = () => InputListener({ type: keyDown, code: 'KeyD' });
    KeyD.onmouseup = () => InputListener({ type: keyUp, code: 'KeyD' });

    KeyK.onmousedown = () => InputListener({ type: keyDown, code: 'KeyK' });
    KeyK.onmouseup = () => InputListener({ type: keyUp, code: 'KeyK' });

    KeyL.onmousedown = () => InputListener({ type: keyDown, code: 'KeyL' });
    KeyL.onmouseup = () => InputListener({ type: keyUp, code: 'KeyL' });
}

class Player {
    constructor() {
        this.y = objectData.player.y;
        this.x = objectData.player.x;
        this.readyForInput = true;
        objectData.player.alive = true;
    }

    handleInput(event) {
        const keyDown = event.type === 'keydown';
        const keyUp = event.type === 'keyup';
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                if (keyDown) {
                    this.movement(0, -_.objectSize);
                }
                this.showInput(KeyW, keyDown, keyUp);
                break;
            case 'KeyA':
            case 'ArrowLeft':
                if (keyDown) {
                    this.movement(-_.objectSize, 0);
                }
                this.showInput(KeyA, keyDown, keyUp);
                break;
            case 'KeyS':
            case 'ArrowDown':
                if (keyDown) {
                    this.movement(0, _.objectSize);
                }
                this.showInput(KeyS, keyDown, keyUp);
                break;
            case 'KeyD':
            case 'ArrowRight':
                if (keyDown) {
                    this.movement(_.objectSize, 0);
                }
                this.showInput(KeyD, keyDown, keyUp);
                break;
            case 'KeyK':
                if (keyDown && objectData.player.hasWeapon) {
                    this.attack();
                }
                this.showInput(KeyK, keyDown, keyUp);
                break;
            case 'KeyL':
                if (keyDown) {
                    this.interact();
                }
                this.showInput(KeyL, keyDown, keyUp);
                break;
            default:
                break;
        }
        this.limitMovement(keyDown);
    }

    limitMovement(keyDown) {
        if (this.readyForInput && keyDown) {
            this.readyForInput = false;
            setTimeout(() => {
                this.readyForInput = true;
            }, 75);
        }
    }

    showInput(key, keyDown, keyUp) {
        if (keyDown) {
            if (!key.className.includes(pressed)) key.className += pressed;
        }
        if (keyUp) {
            if (key.className.includes(pressed))
                key.className = key.className.replace(pressed, '');
        }
    }

    interact() {
        const canCollectWeapon = _.withinArea(this.x, this.y, objectData.weapon);

        if (canCollectWeapon) {
            objectData.player.hasWeapon = true;
            render.singularClear(objectData.weapon);
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

    touchingEnemy() {
        objectData.enemy.collection.map((enemy) => {
            if (_.isTouching(this.x, this.y, enemy)) {
                objectData.player.alive = false;
            }
        });
    }

    restrictMovement() {
        this.x = _.restrict(this.x);
        this.y = _.restrict(this.y);
    }

    movement(x_dir, y_dir) {
        this.touchingEnemy();
        const inputReady = this.readyForInput && objectData.player.alive;
        if (inputReady) {
            const blocked = objectData.walls.collection.some(({ x, y }) => {
                return x === this.x + x_dir && y === this.y + y_dir;
            });
            if (!blocked) {
                render.singularClear({ ...objectData.player, x: this.x, y: this.y });
                this.x += x_dir;
                this.y += y_dir;
                this.restrictMovement();
                render.singular({ ...objectData.player, x: this.x, y: this.y });
            }
        }
    }
}
