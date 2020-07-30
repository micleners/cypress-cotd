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
    it.skip('example without network control', () => {
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

    describe('network control examples', () => {
      beforeEach(() => {
        cy.route({
          method: 'GET',
          url: '/api/fish',
          response: fishes,
        }).as('getFish');

        cy.get('button')
          .contains('Load Sample Fishes')
          .click();
      });

      it('get all fish (GET request)', () => {
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

      it('Edit it a fish (PUT request)', () => {
        cy.route({
          method: 'PUT',
          url: '/api/fish/fish1',
          response: '',
          onResponse: (xhr) =>
            expect(xhr.request.body.status).to.be.equal('available'),
        }).as('putFish');

        const updatedFishes = { ...fishes };
        updatedFishes.fish1.status = 'available';
        cy.route({
          method: 'GET',
          url: '/api/fish',
          response: fishes,
        }).as('getFish');
        cy.get('div.fish-edit select[name="status"]')
          .first()
          .select('available');
        cy.wait('@putFish');
      });

      it('Add a fish (POST request)', () => {
        const fish = {
          name: 'Southwest Trout',
          image: '/images/salmon.jpg',
          desc: "Not the best, but not the worst you'll ever have!",
          price: 1050,
          status: 'available',
        };

        cy.route({
          method: 'POST',
          url: '/api/fish/',
          response: '',
        }).as('postFish');

        const updatedFishes = { ...fishes, fish };
        updatedFishes.fish1.status = 'available';
        cy.route({
          method: 'GET',
          url: '/api/fish',
          response: fishes,
        }).as('getFish');

        cy.get('form.fish-edit').as('fishForm');
        cy.get('@fishForm').should('exist');
        cy.get('@fishForm')
          .find('input[name="name"]')
          .type('Southwest Trout');
        cy.get('@fishForm')
          .find('input[name="price"]')
          .type('1050');
        cy.get('@fishForm')
          .find('textarea[name="desc"]')
          .type("Not the best, but not the worst you'll ever have!");
        cy.get('@fishForm')
          .find('input[name="image"]')
          .type('/images/salmon.jpg');
        cy.get('button')
          .contains('Add Fish!')
          .click();

        cy.wait('@postFish').then((xhr) => {
          expect(xhr.request.body, 'response body').to.deep.equal(fish);
        });
      });

      it.only('Delete a fish (DELETE request', () => {
        cy.route({
          method: 'DELETE',
          url: '/api/fish/fish1',
          response: '',
        }).as('deleteFish');

        const updatedFishes = { ...fishes };
        delete updatedFishes['fish1']
        cy.route({
          method: 'GET',
          url: '/api/fish',
          response: updatedFishes,
        }).as('getFish');

        cy.get('div.fish-edit button')
          .contains('Remove Fish')
          .first()
          .click();

        cy.wait('@deleteFish');
      });
    });
  });
});
