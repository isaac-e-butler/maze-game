/// <reference types="cypress" />

export const roomTitleShouldBe = (text) => {
    cy.get('div#room-title')
        .should('contain.text', text)
        .and('have.attr', 'roomTitle', text);
};

export const progressShouldBe = (value, max) => {
    cy.get('progress#progress')
        .should('have.attr', 'value', value)
        .and('have.attr', 'max', max);
};
