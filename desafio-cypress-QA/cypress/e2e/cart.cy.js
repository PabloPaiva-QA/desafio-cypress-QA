describe('Cart', () => {
    it('Add a product to the cart', () => {
        cy.addAndCheckProductToCart('Aero Daily Fitness Tee', 'L', 'Black')
    });

    it('Add two of the same products to the cart', () => {
        cy.addAndCheckProductToCart('Aero Daily Fitness Tee', 'L', 'Black', '2')
    });

    it('Add two different products to the cart', () => {
        cy.addAndCheckProductToCart('Arcadio Gym Short', '36', 'Blue')
        cy.addAndCheckProductToCart('Ajax Full-Zip Sweatshirt', 'XS', 'Red')
    });

    it('Add an out-of-stock product to the cart', () => {
        cy.unavailableProducts('Abominable Hoodie', 'L', 'Red')
    });

    it('See cart contents', () => {
        cy.addAndCheckProductToCart('Aero Daily Fitness Tee', 'L', 'Black')

        cy.goToCartPage();
        cy.get('.cart_item').should('have.length.greaterThan', 0)
    });

    it('Remove one product from cart', () => {
        cy.addAndCheckProductToCart('Aero Daily Fitness Tee', 'L', 'Black')

        cy.goToCartPage()
        cy.deleteAllProducts()

        cy.get('.mini-cart-items').should('contain', 0)
        cy.get('[class="cart-empty woocommerce-info"]').should('contain', 'Seu carrinho está vazio.')
    });

    it('Remove all products from cart', () => {
        cy.addAndCheckProductToCart('Aero Daily Fitness Tee', 'L', 'Black')
        cy.addAndCheckProductToCart('Ariel Roll Sleeve Sweatshirt', 'XL', 'Green')

        cy.goToCartPage()
        cy.deleteAllProducts()
    });

    it('Remove one product when multiple of the same are in the cart', () => {
        cy.addAndCheckProductToCart('Aero Daily Fitness Tee', 'L', 'Black', '5')

        cy.goToCartPage()
        cy.get('.minus').first().click()
        cy.get('.woocommerce-message').should('contain', 'Carrinho atualizado.')
    });

    it('Enter a valid coupon code (forcing error)', () => {
        let validCoupon = 'BLACKFRIDAY'
        cy.addAndCheckProductToCart('Aero Daily Fitness Tee', 'L', 'Black')

        cy.goToCartPage()
        cy.get('#coupon_code').type(validCoupon)
        cy.get('[name="apply_coupon"]').click()
        cy.get('.woocommerce-message').should('contain', 'Cupom aplicado com sucesso.')
    });

    it('Enter a invalid coupon code', () => {
        let invalidCoupon = 'INVALIDCOUPON'
        cy.addAndCheckProductToCart('Aero Daily Fitness Tee', 'L', 'Black')

        cy.goToCartPage()
        cy.get('#coupon_code').type(invalidCoupon)
        cy.get('[name="apply_coupon"]').click()
        cy.get('.woocommerce-error').should('contain', `O cupom "${invalidCoupon.toLowerCase()}" não existe!`)
    });
});