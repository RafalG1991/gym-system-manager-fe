describe('Change profile data', () => {
  beforeEach(() => {
      cy.visit('/');
      cy.get('input[id=login]').type('testowekonto@wp.pl');
      cy.get('input[id=password]').type('testowe123');
      cy.get('button').contains('Sign in').click();
  });

  after(() => {
    cy.get('button').contains('Change again!').click();
    cy.get('input[id=firstName]').clear().type('Test');
    cy.get('input[id=lastName]').clear().type('User');
    cy.get('button').contains('Change name').click();
    cy.get('input[id=height]').clear().type('185');
    cy.get('input[id=weight]').clear().type('90');
    cy.get('button').contains('Change BMI data').click();
  });

  it('Change first name', () => {
    cy.get('input[id=firstName]').clear().type('Changed');
    cy.get('button').contains('Change name').click();
    cy.contains('p', 'Changed').should('exist');
  });

  it('Change last name', () => {
    cy.get('input[id=lastName]').clear().type('Testuser');
    cy.get('button').contains('Change name').click();
    cy.contains('p', 'Testuser').should('exist');
  });

  it('Change BMI data', () => {
    cy.get('input[id=height]').clear().type('180');
    cy.get('input[id=weight]').clear().type('75');
    cy.get('button').contains('Change BMI data').click();
    cy.contains('p', '180').should('exist');
    cy.contains('p', '75').should('exist');
  });
})