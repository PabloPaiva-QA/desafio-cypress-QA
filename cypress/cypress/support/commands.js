//Logar no site
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/minha-conta')

    if(username) cy.get('#username').type(username)
    if(password) cy.get('#password').type(password), {sensitive: true}
    cy.get('[name="login"]').click()
});

//  Acessar a página do carrinho
Cypress.Commands.add('goToCartPage', () => {
    cy.visit('/carrinho/')
});

// Adicionar produto ao carrinho e verificar
Cypress.Commands.add('addAndCheckProductToCart', (productName, size, color, quantify = '1') => {
    cy.visit('/produtos/');

    cy.contains(productName).click()

    cy.get('[class="product_title entry-title"]').should('contain', productName)
    cy.get('[class="slick-slide slick-active"]').should('be.visible')
    cy.get('.button-variable-item-' + size).click({ position: 'center' })
    cy.get('.button-variable-item-' + color).click({ position: 'center' })
    cy.get('.quantity .qty').clear().type(quantify)
    
    cy.get('.single_add_to_cart_button').click()

    quantify == 1 ? cy.get('.woocommerce-message').should('contain', `“${productName}” foi adicionado no seu carrinho.`).and('contain', 'Ver carrinho') :
    cy.get('.woocommerce-message').should('contain', `${quantify} × “${productName}” foram adicionados no seu carrinho.`).and('contain', 'Ver carrinho')
    
    cy.log('Os itens no carrinho atualmente são de: ', quantify)
})

// Tentar adicionar produto indisponível ao carrinho
Cypress.Commands.add('unavailableProducts', (productName, size, color) => {
    cy.visit('/produtos/');

    cy.contains(productName).click()

    cy.get('[class="product_title entry-title"]').should('contain', productName)
    cy.get('[class="slick-slide slick-active"]').should('be.visible')
    cy.get('.button-variable-item-' + size).click({ position: 'center' })
    cy.get('.button-variable-item-' + color).click({ position: 'center' })
    
    cy.get('.single_add_to_cart_button').click()
    
    cy.on('window:alert',(t)=>{
        if (t.includes('Desculpe, este produto não está disponível. Escolha uma combinação diferente.')) {
        cy.on('window:confirm', () => true);
    }})
})

// Deletar todos os produtos do carrinho
Cypress.Commands.add('deleteAllProducts', () => {
    cy.get('body').then($body => {

        const exists = $body.find('.fa.fa-trash-o').length > 0;
        cy.log('Existem itens no carrinho? ', exists)

        if (exists) {
            cy.get('.fa.fa-trash-o').first().click();

            cy.get('[class="page-title"]', { timeout: 10000 }).should('be.visible');

            cy.get('.woocommerce-message').should('contain', 'removido.')
            cy.goToCartPage();
            
            return cy.deleteAllProducts()
        } else {
            cy.log('Todos os itens foram excluídos')
        }
    });

    cy.get('[class="mini-cart-items"]').should('contain', 0)
    cy.get('[class="cart-empty woocommerce-info"]').should('contain', 'Seu carrinho está vazio.')
});
