import accounts from '../fixtures/accounts.json';

describe('Login', () => {

    it('Log in with a valid e-mail and password', () => {
        cy.login(accounts.validUser.email, accounts.validUser.password);
        cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá, ')
        cy.get('.woocommerce-MyAccount-content').should('contain', 'desafio-cypress-qa')
        cy.get('."hidden-xs').should('contain', 'Welcome desafio-cypress-qa !')
    });

    it('Log in with a valid username and password', () => {
        cy.login(accounts.validUser.username, accounts.validUser.password);
        cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá, ')
        cy.get('.woocommerce-MyAccount-content').should('contain', 'desafio-cypress-qa')
        cy.get('."hidden-xs').should('contain', 'Welcome desafio-cypress-qa !')
    });

    it('Log in with invalid credentials', function() {
        cy.login(accounts.unvalidUser.email, accounts.unvalidUser.password);

        cy.get('.woocommerce-error').should('contain', 'Erro')
        cy.get('.woocommerce-error').should('contain', ': O usuário ')
        cy.get('.woocommerce-error').should('contain', 'invaliduser')
        cy.get('.woocommerce-error').should('contain', 'não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail.')
    });

    it('Log in without credentials', function() {
        cy.login('', '')

        cy.get('.woocommerce-error').should('contain', 'Erro')
        cy.get('.woocommerce-error').should('contain', ' Nome de usuário é obrigatório.		')

        cy.url().should('eql', 'http://lojaebac.ebaconline.art.br/minha-conta/')
    });
});
