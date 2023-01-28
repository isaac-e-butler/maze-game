/// <reference types="cypress" />

import { inputConfig } from '../../../source/config/input.config.js';
import * as _ from './common.steps.js';

export const shouldLoad = () => {
    cy.visit('../../../index.html');

    _.roomTitleToBe('MAZE GAME');

    cy.get('.stage').children().should('have.length', 3);
    canvasToExist('misc-layer');
    canvasToExist('enemy-layer');
    canvasToExist('player-layer');

    _.progressToBe('0%');

    cy.get('.controls').children().should('have.length', 6);
    _.buttonToBe('up', inputConfig.movement, false);
    _.buttonToBe('right', inputConfig.movement, false);
    _.buttonToBe('down', inputConfig.movement, false);
    _.buttonToBe('left', inputConfig.movement, false);
    _.buttonToBe('action1', inputConfig.action.unassigned, false);
    _.buttonToBe('action2', inputConfig.action.start, true);

    canvasToExist('map-image', 'hide-me', '31');

    // width is 400, canvas is 310 | 40 either side
    _.takeScreenshot('start-up');
};

const canvasToExist = (id, className = '', size = '310') => {
    cy.get(`canvas#${id}`)
        .should('have.class', className)
        .and('have.attr', 'height', size)
        .and('have.attr', 'width', size);
};
