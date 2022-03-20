import { objectConfig } from './object.config.js';
import { objectData } from './objectData.js';
import {
    ClearAllEnemies,
    ClearSingular,
    IncProgressBar,
    RenderEnemies,
    RenderPlayer,
} from './renderer.js';
import {
    x_diff,
    y_diff,
    within,
    restrictNegative,
    restrictPositive,
} from './common.js';

const KeyW = document.getElementById('KeyW');
const KeyA = document.getElementById('KeyA');
const KeyS = document.getElementById('KeyS');
const KeyD = document.getElementById('KeyD');
const KeyK = document.getElementById('KeyK');
const KeyL = document.getElementById('KeyL');
const pressed = ' pressed';

const size = objectConfig.size;

export function SpawnPlayer(playerData) {
    objectData.player.object = new Player(playerData);
    const InputListener = (event) =>
        objectData.player.object.handleInput(event);

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
    constructor(playerData) {
        this.y = playerData.y;
        this.x = playerData.x;
        objectData.player.alive = true;
        this.readyForInput = true;
    }

    handleInput(event) {
        const keyDown = event.type === 'keydown';
        const keyUp = event.type === 'keyup';
        const inputReady = this.readyForInput && objectData.player.alive;
        this.limitMovement(keyDown);
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                if (keyDown && inputReady) {
                    this.movement(0, -size);
                }
                this.showInput(KeyW, keyDown, keyUp);
                break;
            case 'KeyA':
            case 'ArrowLeft':
                if (keyDown && inputReady) {
                    this.movement(-size, 0);
                }
                this.showInput(KeyA, keyDown, keyUp);
                break;
            case 'KeyS':
            case 'ArrowDown':
                if (keyDown && inputReady) {
                    this.movement(0, size);
                }
                this.showInput(KeyS, keyDown, keyUp);
                break;
            case 'KeyD':
            case 'ArrowRight':
                if (keyDown && inputReady) {
                    this.movement(size, 0);
                }
                this.showInput(KeyD, keyDown, keyUp);
                break;
            case 'KeyK':
                if (keyDown && objectData.player.hasWeapon && inputReady) {
                    this.attack();
                }
                this.showInput(KeyK, keyDown, keyUp);
                break;
            case 'KeyL':
                if (keyDown && inputReady) {
                    this.interact();
                }
                this.showInput(KeyL, keyDown, keyUp);
                break;
            default:
                break;
        }
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
        const canGrabWeapon =
            within(x_diff(this.x, objectData.weapon)) &&
            within(y_diff(this.y, objectData.weapon));
        if (canGrabWeapon) {
            objectData.weapon.pickedUp = true;
            objectData.player.hasWeapon = true;
            RenderPlayer();
        }
        objectData.treasure.collection = objectData.treasure.collection
            .map((treasure) => {
                const canGrabCoin =
                    within(x_diff(this.x, treasure)) &&
                    within(y_diff(this.y, treasure));
                if (canGrabCoin) {
                    ClearSingular({
                        ...treasure,
                        layer: objectData.treasure.layer,
                    });
                    IncProgressBar();
                    treasure.pickedUp = true;
                }
                return treasure;
            })
            .filter((treasure) => {
                return !treasure.pickedUp;
            });
        objectData.won = objectData.treasure.collection.length === 0;
    }

    attack() {
        objectData.enemy.collection = objectData.enemy.collection
            .map((enemy) => {
                const canAttack =
                    within(x_diff(this.x, enemy)) &&
                    within(y_diff(this.y, enemy));
                if (canAttack) {
                    enemy.hp -= 1;
                }
                return enemy;
            })
            .filter((enemy) => {
                const dead = enemy.hp <= 0;
                return !dead;
            });
        ClearAllEnemies();
        RenderEnemies();
    }

    touchingEnemy() {
        objectData.enemy.collection.forEach((enemy) => {
            if (x_diff(this.x, enemy) === 0 && y_diff(this.y, enemy) === 0) {
                objectData.player.alive = false;
            }
        });
    }

    restrictMovement() {
        this.x = restrictNegative(this.x);
        this.y = restrictNegative(this.y);
        this.x = restrictPositive(this.x);
        this.y = restrictPositive(this.y);
    }

    movement(x_dir, y_dir) {
        this.touchingEnemy();
        const blocked = objectData.walls.collection.some(({ x, y }) => {
            return x === this.x + x_dir && y === this.y + y_dir;
        });
        if (!blocked) {
            objectData.player.prev = { x: this.x, y: this.y };
            this.x += x_dir;
            this.y += y_dir;
            this.restrictMovement();
            this.updateObjectData();
            RenderPlayer();
        }
    }

    updateObjectData() {
        objectData.player = { ...objectData.player, x: this.x, y: this.y };
    }
}
