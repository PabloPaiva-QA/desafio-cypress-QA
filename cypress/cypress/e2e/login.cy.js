describe('Login', () => {
    beforeEach(() => {
        cy.visit('/minha-conta');
    });

    it('Log in with a valid e-mail and password', () => {
        cy.login('desafio-cypress-qa@gmail.com', 'Des@fioQ@');
        cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá, ');
        cy.get('.woocommerce-MyAccount-content').should('contain', 'desafio-cypress-qa');
        cy.get('[class="hidden-xs"]').should('contain', 'Welcome desafio-cypress-qa !');
    });

    it('Log in with a valid username and password', () => {
        cy.login('desafio-cypress-qa', 'Des@fioQ@');
        cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá, ');
        cy.get('.woocommerce-MyAccount-content').should('contain', 'desafio-cypress-qa');
        cy.get('[class="hidden-xs"]').should('contain', 'Welcome desafio-cypress-qa !');
    });

    it('Log in with invalid credentials', function() {
        cy.login('invaliduser', 'wrongpassword');

        cy.get('.woocommerce-error').should('contain', 'Erro');
        cy.get('.woocommerce-error').should('contain', ': O usuário ');
        cy.get('.woocommerce-error').should('contain', 'invaliduser');
        cy.get('.woocommerce-error').should('contain', 'não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail.');
    });

    it('Log in without credentials', function() {
        cy.login('', '');

        cy.get('.woocommerce-error').should('contain', 'Erro');
        cy.get('.woocommerce-error').should('contain', ' Nome de usuário é obrigatório.		');

        cy.url().should('eql', 'http://lojaebac.ebaconline.art.br/minha-conta/');
    });
});
