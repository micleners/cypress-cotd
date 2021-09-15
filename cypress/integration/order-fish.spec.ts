describe('Adding/removing fish', () => {
  const url = `${Cypress.env('localUrl')}`;
  // switch comment between line above and line below to run tests on web vs locally. (Don't forget to `npm run start`)
  // const url = `${Cypress.env("webUrl")}`;

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
          .type("Not the best, but not the worst you'll ever have!");
        cy.get('@fishForm')
          .find('input[name="image"]')
          .type('/images/salmon.jpg');
        cy.get('button')
          .contains('Add Fish!')
          .click();

        cy.get('div.fish-edit input[name="name"]')
          .first()
          .should('contain.value', 'Southwest Trout');
        cy.get('div.fish-edit input[name="price"]')
          .first()
          .should('contain.value', '1050');
        cy.get('div.fish-edit textarea[name="desc"]')
          .first()
          .should(
            'contain.value',
            "Not the best, but not the worst you'll ever have!"
          );
        cy.get('div.fish-edit input[name="image"]')
          .first()
          .should('contain.value', '/images/salmon.jpg');
      });

      it('can add fish and see fish on left hand menu', () => {
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

        cy.get('h3.fish-name')
          .first()
          .should('contain', 'Southwest Trout');
        cy.get('h3.fish-name')
          .first()
          .should('contain', '$10.50');
        cy.get('li.menu-fish p')
          .first()
          .should(
            'contain',
            "Not the best, but not the worst you'll ever have!"
          );
        cy.get('img[alt="Southwest Trout"]').should(
          'have.attr',
          'src',
          '/images/salmon.jpg'
        );
      });
    });

    describe('load sample fish', () => {
      beforeEach(() => {
        cy.get('button')
          .contains('Load Sample Fishes')
          .click();
      });

      // Are these tests necessary? Do they add benefit?
      describe('form', () => {
        it('should have correct number of fish forms', () => {
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

        it('should have the correct fish prices', () => {
          const fishPrices = [
            '1724',
            '3200',
            '1684',
            '1129',
            '4234',
            '1453',
            '2543',
            '425',
            '2250',
          ];
          cy.get('div.fish-edit input[name="price"]').each((fish, index) => {
            expect(fish.val()?.toString()).to.equal(fishPrices[index]);
          });
        });

        it('should have the correct description for the fish', () => {
          const fishStatuses = [
            'available',
            'available',
            'unavailable',
            'available',
            'available',
            'available',
            'available',
            'available',
            'available',
          ];
          cy.get('div.fish-edit select[name="status"]').each((fish, index) => {
            expect(fish.attr('data-value')).to.equal(fishStatuses[index]);
          });
        });

        it('should have the correct description for the fish', () => {
          const fishDescriptions = [
            'These tender, mouth-watering beauties are a fantastic hit at any dinner party.',
            'Big, sweet and tender. True dry-pack scallops from the icy waters of Alaska. About 8-10 per pound',
            'Crack these open and enjoy them plain or with one of our cocktail sauces',
            'This flaky, oily salmon is truly the king of the sea. Bake it, grill it, broil it...as good as it gets!',
            'A soft plump oyster with a sweet salty flavor and a clean finish.',
            'The best mussels from the Pacific Northwest with a full-flavored and complex taste.',
            'With 21-25 two bite prawns in each pound, these sweet morsels are perfect for shish-kabobs.',
          ];
          cy.get('div.fish-edit textarea[name="desc"]').each((fish, index) => {
            expect(fish.val()?.toString()).to.equal(fishDescriptions[index]);
          });
        });

        it('should have the correct fish images', () => {
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
          cy.get('div.fish-edit input[name="image"]').each((fish, index) => {
            expect(fish.val()?.toString()).to.equal(fishImages[index]);
          });
        });
      });

      describe.skip('market menu', () => {
        // Easter egg! This test was failing, too :'D
        it('should have the correct number of fish displayed', () => {
          cy.get('li.menu-fish').should('have.length', 9);
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
          // why isn't this working? Is there an alternative to `to.equal`?
          cy.get('h3.fish-name').each((fish, index) => {
            expect(fish.text()).to.contain(fishName[index]);
          });
        });

        it('should have the correct fish prices', () => {
          const fishPrices = [
            '1724',
            '3200',
            '1684',
            '1129',
            '4234',
            '1453',
            '2543',
            '425',
            '2250',
          ];
          cy.get('h3.fish-name span').each((fish, index) => {
            expect(fish.text()).to.equal(
              (parseInt(fishPrices[index]) / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
            );
          });
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
        it('FAILING: should have the correct fish images', () => {
          const fishImages = [];
          // delete the next line and add missing code here to test these values
          expect(true).to.be.false;
        });

        // TODO: Fix test and remove "FAILING" flag
        it('FAILING: should have the correct description for the fish', () => {
          // delete the next line and add missing code
          expect(true).to.be.false;
        });
      });
    });

    describe.skip('adding fish to order', () => {
      it('can add fish by clicking add to order', () => {});
      it('can add multiple fishes of multiple types', () => {});
      it('can remove fishes after adding', () => {
        // note: there is a bug in the app here!
        // Feel free to try and fix it or .skip this test permanently :)
      });
      it('calculates total price corrects', () => {});
    });
  });
});