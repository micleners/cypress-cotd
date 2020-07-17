const url = `${Cypress.env('localUrl')}`;

describe('Home', () => {
  beforeEach(() => cy.login());

  it('logs in programmatically without using the UI', function() {
    cy.visit(url);
    cy.get('button').click();
    cy.dataCy('name')
    // cy.get('#username').contains(firebase.auth().currentUser.email)
  });
});
