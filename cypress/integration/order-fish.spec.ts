describe('Adding/removing fish', () => {
  // const url = `${Cypress.env('localUrl')}`;
  // const url = `${Cypress.env("webUrl")}`;
  // TODO: define URL variables in cypress.json

  // const url = 'http://localhost:3000';
  // uncomment line above and comment out line below to run tests locally. (Don't forget to `npm run start`)
  const url = `https://cypress-cotd.micleners.com`;

  describe('Navigate to COTD homepage and create store', () => {
    // beforeEach will before every test. Here we visit the homepage
    beforeEach(() => {
      cy.visit(url);
      cy.get('button').click();
    });

    it('should have the correct headers', () => {
      cy.get('h2').should('contain', 'Order');
      cy.get('h2').should('contain', 'Inventory');

      cy.get('h1').should('contain', 'Catch');
      cy.get('h1').should('contain', 'of');
      cy.get('h1').should('contain', 'the');
      cy.get('h1').should('contain', 'day');
    });

    describe('Add a fish form', () => {
      it('should be able to add a fish on the main store page', () => {
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
          .type('1050');
        cy.get('@fishForm')
          .find('input[name="image"]')
          .type('/images/salmon.jpg');
        cy.get('button')
          .contains('Add Fish!')
          .click();

        cy.get('div.fish-edit input[name="name"]')
          .first()
          .should('contain.value', 'Southwest Trout');

        // TODO: finishing asserting the rest of the fields
      });

      // TODO: Fix test and remove "FAILING" flag
      it('FAILING: can add fish and see fish on left hand menu', () => {
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
          .type('1050');
        cy.get('@fishForm')
          .find('input[name="image"]')
          .type('/images/salmon.jpg');
        cy.get('button')
          .contains('Add Fish!')
          .click();

        // TODO: fix this next assertion
        cy.get('h3.fish-name')
          .first()
          .should('contain', 'Halibut');

        // TODO: finishing asserting the rest of the display values
      });
    });

    describe('load sample fish', () => {
      beforeEach(() => {
        cy.get('button')
          .contains('Load Sample Fishes')
          .click();
      });

      it('should on button click', () => {
        cy.get('div.fish-edit').should('have.length', 9);
      });

      it('should have the correct fish names', () => {
        const fishName = [
          'Pacific Halibut',
          'Lobster',
          'Sea Scallops',
          'Mahi Mahi',
          'King Crab',
          'Atlantic Salmon',
          'Oysters',
          'Mussels',
          'Jumbo Prawns',
        ];
        cy.get('div.fish-edit input[name="name"]').each((fish, index) => {
          expect(fish.val()?.toString()).to.equal(fishName[index]);
        });
      });

      // TODO: Fix test and remove "FAILING" flag
      // Hint: is the query selector for the element correct?
      it('FAILING: should have the correct fish prices', () => {
        const fishPrices = [
          '1724',
          '3200',
          '1129',
          '4234',
          '1684',
          '1453',
          '2543',
          '425',
          '2250',
        ];
        // fix code in next line
        cy.get('div.fish-edit input[name="name"]').each((fish, index) => {
          expect(fish.val()?.toString()).to.equal(fishPrices[index]);
        });
      });

      // TODO: Fix test and remove "FAILING" flag
      it('FAILING: should have the correct fish images', () => {
        const fishImages = [
          '/images/hali.jpg',
          '/images/lobster.jpg',
          '/images/scallops.jpg',
          '/images/mahi.jpg',
          '/images/crab.jpg',
          '/images/salmon.jpg',
          '/images/oysters.jpg',
          '/images/mussels.jpg',
          '/images/prawns.jpg',
        ];
        cy.pause()
        // delete the next line and add missing code here to test these values
        expect(true).to.be.false;
      });

      // TODO: Fix test and remove "FAILING" flag
      it('FAILING: should have the correct description for the fish', () => {
        const fishDescriptions = [
          'These tender, mouth-watering beauties are a fantastic hit at any dinner party.',
          'Big, sweet and tender. True dry-pack scallops from the icy waters of Alaska. About 8-10 per pound',
          'Crack these open and enjoy them plain or with one of our cocktail sauces',
          'This flaky, oily salmon is truly the king of the sea. Bake it, grill it, broil it...as good as it gets!',
          'A soft plump oyster with a sweet salty flavor and a clean finish.',
          'The best mussels from the Pacific Northwest with a full-flavored and complex taste.',
          'With 21-25 two bite prawns in each pound, these sweet morsels are perfect for shish-kabobs.',
        ];
        // delete the next line and add missing code here to test these values
        expect(true).to.be.false;
      });

      // TODO: Fix test and remove "FAILING" flag
      it('FAILING: should have the correct description for the fish', () => {
        // TODO: Add this line
        const fishStatuses = [];
        // delete the next line and add missing code here to test these values
        expect(true).to.be.false;
      });
    });
  });
});
