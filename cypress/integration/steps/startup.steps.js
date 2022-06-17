/// <reference types="cypress" />

import { inputConfig } from '../../../source/config/input.config.js';
import * as _ from './common.steps.js';

const keyCode = {
    up: 'W',
    left: 'A',
    down: 'S',
    right: 'D',
};

export const shouldLoad = () => {
    cy.visit('../../../index.html');

    _.roomTitleToBe('MAZE GAME');

    cy.get('.stage').children().should('have.length', 3);
    canvasToExist('misc-layer');
    canvasToExist('enemy-layer');
    canvasToExist('player-layer');

    _.progressToBe(0, 0);

    cy.get('.controls').children().should('have.length', 2);

    cy.get('.movement').children().should('have.length', 4);
    ['up', 'left', 'down', 'right'].map((keyId) => {
        cy.get(`button#${keyId}`)
            .should('have.attr', 'title', keyCode[keyId])
            .and('have.attr', 'tabindex', '-1')
            .and('be.disabled');
        cy.get(`button#${keyId} > span`).should('have.class', `arrow ${keyId}`);
    });

    cy.get('.actions').children().should('have.length', 2);
    _.btnToBe('action1', inputConfig.action.unassigned);
    _.btnToBe('action2', inputConfig.action.start);

    canvasToExist('map-image', 'hide-me', '31');
};

const canvasToExist = (id, className = '', size = '310') => {
    cy.get(`canvas#${id}`)
        .should('have.attr', 'width', size)
        .and('have.attr', 'height', size)
        .and('have.class', className);
};
