describe('empty spec', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('input[id=login]').type('testowekonto@wp.pl');
      cy.get('input[id=password]').type('testowe123');
      cy.get('button').contains('Sign in').click();
      cy.contains('a', 'Membership').click();
    });

    it('Visit Membership view', () => {
      cy.contains('h1', 'Membership').should('exist');
    });

  it('Gym pass successfull checkout', () => {
    cy.get('button').contains('Checkout').click();
    cy.contains('p', 'Your gym pass has been extended!').should('exist');
  });
})