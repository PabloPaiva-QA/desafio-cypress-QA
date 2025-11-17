// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/minha-conta');

    if(username) cy.get('#username').type(username);
    if(password) cy.get('#password').type(password);
    cy.get('[name="login"]').click();
});

Cypress.Commands.add('addProductToCart', (productName, size, color) => {
    cy.visit('/');

    cy.contains(productName).click();

    if(size) cy.get('.button-variable-item-' + size).click();
    if(color) cy.get('.button-variable-item-' + color).click();

    cy.get('.single_add_to_cart_button').click();

    cy.get('.woocommerce-message')
        .should('contain', 'foi adicionado no seu carrinho');
});