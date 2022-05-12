/// <reference types="cypress" />

import * as _ from './common.steps.js';

export const shouldLoad = () => {
    cy.visit('../../../source/index.html');

    _.roomTitleShouldBe('MAZE GAME');

    cy.get('.stage').children().should('have.length', 3);
    canvasShouldExist('misc-layer');
    canvasShouldExist('enemy-layer');
    canvasShouldExist('player-layer');
    canvasShouldExist('map-image', 'hide-me', '31');

    _.progressShouldBe(0, 0);

    cy.get('.movement').children().should('have.length', 4);

    cy.get('.actions').children().should('have.length', 2);
};

const canvasShouldExist = (id, className = '', size = '310') => {
    cy.get(`canvas#${id}`)
        .should('have.attr', 'width', size)
        .and('have.attr', 'height', size)
        .and('have.class', className);
};
