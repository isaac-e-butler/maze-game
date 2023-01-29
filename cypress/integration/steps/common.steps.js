/// <reference types="cypress" />

export const roomTitleToBe = text => {
    cy.get('#maze-title').should('contain.text', text).and('have.attr', 'maze-title', text);
};

export const progressToBe = value => {
    cy.get('#progress-value').should('have.attr', 'value', value);
};

export const buttonToBe = (id, config, toggle) => {
    buttonToHaveSource(id, config);
    buttonToBeEnabled(id, toggle);
};

export const buttonToBeEnabled = (id, enabled) => {
    if (enabled) cy.get(`button#${id}`).should('not.be.disabled');
    else cy.get(`button#${id}`).should('be.disabled');
};

export const buttonToHaveSource = (id, config) => {
    cy.get(`button#${id} > img`).should('have.attr', 'src', config.src);
};

export const takeScreenshot = name => {
    // width is 400, canvas is 310 | 40 either side
    cy.screenshot(name, { clip: { x: 40, y: 84, width: 320, height: 600 }, overwrite: true });
};
