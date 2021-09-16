describe('Adding/removing fish', () => {
  const url = `${Cypress.env('localUrl')}`;
  // switch comment between line above and line below to run tests on web vs locally. (Don't forget to `npm run start`)
  // const url = `${Cypress.env("webUrl")}`;

  // beforeEach will before every test. Here we visit the homepage
  beforeEach(() => {
    cy.visit(url);
    cy.get('button').click();
  });

  describe('Navigate to COTD homepage and create store', () => {

    it('should have the correct headers', () => {
      cy.get('h2').should('contain', 'Order');
      cy.get('h2').should('contain', 'Inventory');

      cy.get('h1').should('contain', 'Catch');
      cy.get('h1').should('contain', 'of');
      cy.get('h1').should('contain', 'the');
      cy.get('h1').should('contain', 'day');
    });
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

    // Are form tests necessary? Do they add benefit?
    describe('form', () => {
      it('should have correct number of fish forms', () => {
        cy.get('div.fish-edit').should('have.length', 9);
      });

      it('should have the correct fish names', () => {
        const fishNames = [
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
        cy.get('div.fish-edit input[name="name"]').each((fishName, index) => {
          cy.wrap(fishName).should('have.value', fishNames[index])
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
        cy.get('div.fish-edit input[name="price"]').each((fishPrice, index) => {
          cy.wrap(fishPrice).should('have.value', fishPrices[index])
        });
      });

      it('should have the correct availability for the fish', () => {
        const fishStatuses = [
          'available',
          'available',
          'available',
          'available',
          'available',
          'available',
          'available',
          'available',
          'available',
        ];
        cy.get('div.fish-edit select[name="status"]').each((fish, index) => {
          cy.wrap(fish).find("option:selected").contains(fishStatuses[index])
        });
      });

      it('should have the correct description for the fish', () => {
        const fishDescriptions = [
          'Everyones favorite white fish. We will cut it to the size you need and ship it.',
          'These tender, mouth-watering beauties are a fantastic hit at any dinner party.',
          'Big, sweet and tender. True dry-pack scallops from the icy waters of Alaska. About 8-10 per pound',
          'Lean flesh with a mild, sweet flavor profile, moderately firm texture and large, moist flakes.',
          'Crack these open and enjoy them plain or with one of our cocktail sauces',
          'This flaky, oily salmon is truly the king of the sea. Bake it, grill it, broil it...as good as it gets!',
          'A soft plump oyster with a sweet salty flavor and a clean finish.',
          'The best mussels from the Pacific Northwest with a full-flavored and complex taste.',
          'With 21-25 two bite prawns in each pound, these sweet morsels are perfect for shish-kabobs.',
        ];
        cy.get('div.fish-edit textarea[name="desc"]').each((fish, index) => {
          cy.wrap(fish).contains(fishDescriptions[index])
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
        cy.get('div.fish-edit input[name="image"]').each((fishImage, index) => {
          cy.wrap(fishImage).should('have.value', fishImages[index])
        });
      });
    });

    describe('market menu', () => {
      it('should have the correct number of fish displayed', () => {
        cy.get('li.menu-fish').should('have.length', 9);
      });

      it('should have the correct fish names', () => {
        const fishNames = [
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
        cy.get('h3.fish-name').each((fishName, index) => {
          cy.wrap(fishName).contains(fishNames[index]);
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

      it('should have the correct description for the fish', () => {
        const fishDescriptions = [
          'Everyones favorite white fish. We will cut it to the size you need and ship it.',
          'These tender, mouth-watering beauties are a fantastic hit at any dinner party.',
          'Big, sweet and tender. True dry-pack scallops from the icy waters of Alaska. About 8-10 per pound',
          'Lean flesh with a mild, sweet flavor profile, moderately firm texture and large, moist flakes.',
          'Crack these open and enjoy them plain or with one of our cocktail sauces',
          'This flaky, oily salmon is truly the king of the sea. Bake it, grill it, broil it...as good as it gets!',
          'A soft plump oyster with a sweet salty flavor and a clean finish.',
          'The best mussels from the Pacific Northwest with a full-flavored and complex taste.',
          'With 21-25 two bite prawns in each pound, these sweet morsels are perfect for shish-kabobs.',
        ];
        cy.get('li.menu-fish p').each((fishDescription, index) => {
          cy.wrap(fishDescription).contains(fishDescriptions[index]);
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
        cy.get('li.menu-fish img').each((fishImage, index) => {
          cy.wrap(fishImage).should('have.attr', 'src', fishImages[index])
        });
      });
    });
  });

  describe('adding fish to order', () => {
    beforeEach(() => {
      cy.get('button')
        .contains('Load Sample Fishes')
        .click();
    });

    it('can add fish by clicking add to order', () => {
      cy.get('button').contains('Add To Order').first().click()
      cy.get('ul.order').contains('1lbs Pacific Halibut')
      cy.get('button').contains('Add To Order').first().click()
      cy.get('ul.order li:nth-child(1)>span').contains('2')
      cy.get('ul.order li:nth-child(1)>span').contains('lbs Pacific Halibut')
    });

    it('can add multiple fishes of multiple types', () => {
      cy.get('button').contains('Add To Order').first().click()
      cy.get('ul.order').contains('1lbs Pacific Halibut')
      cy.get('button').contains('Add To Order').first().click()
      cy.get('ul.order li:nth-child(1)>span').contains('2')
      cy.get('ul.order li:nth-child(1)>span').contains('lbs Pacific Halibut')

      cy.get('li.menu-fish').eq(1).find('button').contains('Add To Order').click()
      cy.get('ul.order li:nth-child(2)').contains('1lbs Lobster')

      cy.get('ul.order li:nth-child(1)>span').contains('2')
      cy.get('ul.order li:nth-child(1)>span').contains('lbs Pacific Halibut')
    });

    it.only('can remove fishes after adding', () => {
      // setup
      cy.get('button').contains('Add To Order').first().click()
      cy.get('button').contains('Add To Order').first().click()
      cy.get('li.menu-fish').eq(1).find('button').contains('Add To Order').click()

      // remove fish
      cy.get('ul.order li:nth-child(1)').find('button').contains('×').invoke('show').click();

      // Wait for CSS transition to complete. Better way to do this?
      cy.wait(500)
      cy.get('ul.order li:nth-child(1)>span').contains('1')
      cy.get('ul.order li:nth-child(1)>span').contains('lbs Lobster')
      cy.get('ul.order li').should('have.length', 1);

      // remove other fish
      cy.get('ul.order li').find('button').contains('×').invoke('show').click();

      cy.wait(500)
      cy.get('ul.order li').should('have.length', 0);

    });
  });
});