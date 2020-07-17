/// <reference types="Cypress" />
import firebase from 'firebase';

const url = `${Cypress.env('localUrl')}`;

console.log(Cypress.env('REACT_APP_apiKey'))
console.log(Cypress.env('apples'))
firebase.initializeApp({
  apiKey: Cypress.env('apiKey'),
  authDomain: Cypress.env('authDomain'),
  appId: Cypress.env('appId'),
});

describe('Home', () => {
  beforeEach(function() {
    // cy.exec('firebase database:set / cypress/fixtures/seed.json --confirm')
    firebase
      .auth()
      .signInWithEmailAndPassword(
        Cypress.env('username'),
        Cypress.env('password')
      );
  });

  it('logs in programmatically without using the UI', function() {
    cy.visit(url);
    cy.get('button').click();

    // cy.get('#username').contains(firebase.auth().currentUser.email)
  });
});
