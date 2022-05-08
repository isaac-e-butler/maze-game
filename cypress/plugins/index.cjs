/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
    on('file:preprocessor', cucumber());
};
