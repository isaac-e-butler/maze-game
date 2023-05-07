/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

export function keyPress(key, times = 1, playing = true) {
    for (let i = 0; i < times; i++) {
        cy.get('html')
            .trigger('keydown', { code: key })
            .trigger('keyup', { code: key })
            .wait(playing ? 80 : 205);
    }
}

export const code = {
    up: 'KeyW',
    right: 'KeyD',
    down: 'KeyS',
    left: 'KeyA',
    action1: 'KeyK',
    action2: 'KeyL',
};
