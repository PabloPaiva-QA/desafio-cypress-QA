describe('Cart', () => {
    it('Add a product to the cart', () => {
        cy.visit('/produtos/');
        cy.addProductToCart('Aero Daily Fitness Tee', 'L', 'Black');
        cy.get('.woocommerce-message')
            .should('contain', 'Abominable Hoodie');
    });

    it('Check if the product is added to the cart', () => {
        cy.visit('/produtos/');
        cy.get('.product-block').first().click();
        cy.get('.button-variable-item-M').click();
        cy.get('.button-variable-item-Blue').click();
        cy.get('.single_add_to_cart_button').click();
        cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho.');
    });
});