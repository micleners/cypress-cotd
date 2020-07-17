/// <reference types="Cypress" />
import firebase from 'firebase';

import './commands';

Cypress.Commands.add('login', () => {
  firebase.initializeApp({
    apiKey: Cypress.env('apiKey'),
    authDomain: Cypress.env('authDomain'),
    appId: Cypress.env('appId'),
  });

  firebase
    .auth()
    .signInWithEmailAndPassword(
      Cypress.env('username'),
      Cypress.env('password')
    );
});

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[name=${value}]`);
});
