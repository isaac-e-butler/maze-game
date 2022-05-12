/// <reference types="cypress" />

export const onStartUp = () => {
    cy.visit('../../../source/index.html');

    titleShouldBe('MAZE GAME');

    cy.get('.stage').children().should('have.length', 3);
    canvasShouldExist('misc-layer');
    canvasShouldExist('enemy-layer');
    canvasShouldExist('player-layer');
    canvasShouldExist('map-image', 'hide-me', '31');

    progressShouldBe(0, 0);
};

export const titleShouldBe = (text) => {
    cy.get('div#room-title')
        .should('contain.text', text)
        .and('have.attr', 'roomTitle', text);
};

export const progressShouldBe = (value, max) => {
    cy.get('progress#progress')
        .should('have.attr', 'value', value)
        .and('have.attr', 'max', max);
};

const canvasShouldExist = (id, className = '', size = '310') => {
    cy.get(`canvas#${id}`)
        .should('have.attr', 'width', size)
        .and('have.attr', 'height', size)
        .and('have.class', className);
};
