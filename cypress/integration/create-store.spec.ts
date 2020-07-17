describe.skip("Home page and creating a store", () => {
  // TODO: define URL variables in cypress.json
  // const localUrl = `${Cypress.env("localUrl")}`;
  // const webUrl = `${Cypress.env("webUrl")}`;
  const localUrl = 'http://localhost:3000';
  const webUrl = `https://cypress-cotd.micleners.com`;

  describe("Tests hitting web url", () => {
    describe("Navigate to COTD homepage and create store", () => {
      // beforeEach will before every test. Here we visit the homepage
      beforeEach(() => {
        cy.visit(webUrl);
      });

      it("should load the create store page on home", () => {
        // Assert that the store button input and visit store button exists
        cy.get(".store-selector input").should("exist");
        cy.get("button").should("contain", "Visit Store");
      });

      it("should have a randomly generated value loaded in the input", () => {
        // declare variables to assign later
        let storeName1: any;
        let storeName2: any;

        // assign value in input to variable by dropping into JQuery on element
        cy.get(".store-selector input").then(
          input => (storeName1 = input.val())
        );

        // visit the homepage a 2nd time
        cy.visit(webUrl);
        cy.get(".store-selector input").then(input => {
          // assign value of input to 2nd variable
          storeName2 = input.val();
          // drop into Chai assertion to check that texts are equal
          expect(storeName1).to.not.be.equal(storeName2);
        });
      });

      it('should create a store when you click "visit store"', () => {
        let storeName;
        cy.get(".store-selector input").then(input => {
          storeName = input.val();

          cy.get("button").click();
          cy.url().should("contain", storeName);
        });
      });
    });
  });

  describe("Tests hitting local url", () => {
    describe("Navigate to COTD homepage and create store", () => {
      beforeEach(() => {
        cy.visit(localUrl);
      });

      it("should load the create store page on home", () => {
        cy.get(".store-selector input").should("exist");
        cy.get("button").should("contain", "Visit Store");
      });

      it("should have a randomly generated value loaded in the input", () => {
        let storeName1: any;
        let storeName2: any;

        cy.get(".store-selector input").then(
          input => (storeName1 = input.val())
        );

        cy.visit(localUrl);
        cy.get(".store-selector input").then(input => {
          storeName2 = input.val();
          expect(storeName1).to.not.be.equal(storeName2);
        });
      });

      it('should create a store when you click "visit store"', () => {
        let storeName;
        cy.get(".store-selector input").then(input => {
          storeName = input.val();

          cy.get("button").click();
          cy.url().should("contain", storeName);
        });
      });
    });
  });
});
