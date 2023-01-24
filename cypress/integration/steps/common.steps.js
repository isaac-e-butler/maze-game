/// <reference types="cypress" />

export const roomTitleToBe = (text) => {
    cy.get('div#maze-title').should('contain.text', text).and('have.attr', 'maze-title', text);
};

export const progressToBe = (value, max) => {
    cy.get('progress#progress').should('have.attr', 'value', value).and('have.attr', 'max', max);
};

export const btnToBeEnabled = (id) => {
    cy.get(`button#${id}`).should('not.be.disabled');
};

export const btnToBeDisabled = (id) => {
    cy.get(`button#${id}`).should('be.disabled');
};

export const btnToBe = (id, action) => {
    const keyCode = {
        action1: 'KEY K',
        action2: 'KEY L',
    };

    cy.get(`button#${id}`)
        .should('have.attr', 'title', `${action.title}  -  ${keyCode[id]}`)
        .and('have.attr', 'tabindex', '-1');
    cy.get(`button#${id} > img`).should('have.attr', 'src', action.src);
};
