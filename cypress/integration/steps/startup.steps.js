/// <reference types="cypress" />

import { inputConfig } from '../../../source/config/input.config.js';
import * as common from './common.steps.js';

export const shouldLoad = () => {
    cy.visit('../../../index.html');

    common.roomTitleToBe('MAZE GAME');

    cy.get('.stage').children().should('have.length', 3);
    canvasToExist('misc-layer');
    canvasToExist('enemy-layer');
    canvasToExist('player-layer');

    common.progressToBe('0%');

    cy.get('.controls').children().should('have.length', 6);
    common.buttonToBe('up', inputConfig.movement, false);
    common.buttonToBe('right', inputConfig.movement, false);
    common.buttonToBe('down', inputConfig.movement, false);
    common.buttonToBe('left', inputConfig.movement, false);
    common.buttonToBe('action1', inputConfig.action.unassigned, false);
    common.buttonToBe('action2', inputConfig.action.start, true);

    canvasToExist('map-image', 'hide-me', '31');

    common.takeScreenshot('start-up');
};

function canvasToExist(id, className = '', size = '310') {
    cy.get(`canvas#${id}`)
        .should('have.class', className)
        .and('have.attr', 'height', size)
        .and('have.attr', 'width', size);
}
