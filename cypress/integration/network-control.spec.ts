import fishes from '../fixtures/sample-fishes';

describe('Tests with network control', () => {
  const url = `${Cypress.env('localUrl')}`;

  beforeEach(() => {
    cy.server();
    cy.route('/api/fish').as('getFish');
    cy.visit(url);
    cy.get('button').click();
  });

  describe('loading sample fish', () => {
    it('example without network control', () => {
      cy.get('button')
        .contains('Load Sample Fishes')
        .click();
      // @ts-ignore
      cy.get('@getFish').then((xhr: XMLHttpRequest) => {
        const body = xhr.response.body;
        expect(body.fish1).to.include({
          desc:
            'Everyones favorite white fish. We will cut it to the size you need and ship it.',
          image: '/images/hali.jpg',
          name: 'Pacific Halibut',
          price: 1724,
          status: 'available',
        });
      });
    });

    it('example with network control', () => {
      cy.route({
        method: 'GET',
        url: '/api/fish',
        response: fishes,
      }).as('getFish');
      cy.get('button')
        .contains('Load Sample Fishes')
        .click();
      cy.get('@getFish').then(console.log);
      // @ts-ignore
      cy.get('@getFish').then((xhr: XMLHttpRequest) => {
        const body = xhr.response.body;
        expect(body.fish1).to.include({
          desc: "Everyone's favorite halo fish. It is simply divine.",
          image: '/images/halo.jpg',
          name: 'Atlantic Halofish',
          price: 1724,
          status: 'unavailable',
        });
      });
    });
  });
});
