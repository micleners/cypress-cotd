import fishes from '../fixtures/sample-fishes.json';

describe('Tests with network control', () => {
  const url = `${Cypress.env('localUrl')}`;

  beforeEach(() => {
    cy.request('http://localhost:3001/reset');
    cy.server();
    cy.intercept('/sample-fish').as('getFish');
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
          desc: 'Everyones favorite white fish. We will cut it to the size you need and ship it.',
          image: '/images/hali.jpg',
          name: 'Pacific Halibut',
          price: 1724,
          status: 'available',
        });
      });
    });

    describe('network control examples', () => {
      beforeEach(() => {
        cy.intercept('GET', '/', fishes).as('getFish');

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
        cy.intercept(
          'PUT',
          '/fish1',
          // asserting on a request body
          req => expect(req.body.status).to.be.equal('unavailable')
        ).as('putFish');

        const updatedFishes = { ...fishes };
        updatedFishes.fish1.status = 'unavailable';
        cy.intercept('GET', '/', fishes).as('getFish');

        cy.get('div.fish-edit select[name="status"]')
          .first()
          .select('unavailable');
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

        cy.intercept('POST', '/', {
          statusCode: 201,
          body: fish,
        }).as('postFish');

        const updatedFishes = { ...fishes, fish };
        updatedFishes.fish1.status = 'available';
        cy.intercept('GET', '/', fishes).as('getFish');

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

        cy.wait('@postFish').then(xhr => {
          expect(xhr.request.body, 'response body').to.deep.equal(fish);
        });
      });

      it('Delete a fish (DELETE request', () => {
        cy.intercept('DELETE', '/fish1', {
          statusCode: 204,
          body: '',
        }).as('deleteFish');

        const { fish1, ...updatedFishes } = { ...fishes };

        cy.intercept('GET', '/', updatedFishes).as('getFish');

        cy.get('div.fish-edit button')
          .contains('Remove Fish')
          .first()
          .click();

        cy.wait('@deleteFish');
      });
    });
  });
});
