describe('Log in', () => {
  it('Renders unauthenticated app', () => {
    cy.visit('/');
    cy.get('input[id=login]').type('testowekonto@wp.pl');
    cy.get('input[id=password]').type('testowe123');
    cy.get('button').contains('Sign in').click();
    cy.contains('h1', 'Your profile').should('exist');
  });
});
