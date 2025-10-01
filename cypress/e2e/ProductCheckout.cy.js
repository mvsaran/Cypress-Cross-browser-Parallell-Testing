describe('Checkout Flow - SauceDemo', () => {
  it('completes checkout', () => {
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.contains('Sauce Labs Backpack').parents('.inventory_item').find('button').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
   cy.get('[data-test="finish"]').click();
    cy.get('h2.complete-header', { timeout: 10000 })
  .should('contain.text', 'Thank you for your order!');
  });
});
