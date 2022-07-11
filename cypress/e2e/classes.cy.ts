describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[id=login]').type('testowekonto@wp.pl');
    cy.get('input[id=password]').type('testowe123');
    cy.get('button').contains('Sign in').click();
    cy.contains('a', 'Classes').click();
  });

  it('Visit Classes view', () => {
    cy.contains('h1', 'Classes').should('exist');
  });

  it('View event details', () => {
    cy.wait(2000);
    cy.get('.fc-event-title-container').first().invoke('text').then((text1) => {
      cy.contains('div', text1).click();

      cy.get('h1').eq(1).invoke('text').should((text2) => {
        expect(text1).to.equal(text2);
      });
    });
  });
})