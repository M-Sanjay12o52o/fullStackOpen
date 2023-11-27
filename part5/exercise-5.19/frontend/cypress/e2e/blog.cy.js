describe("Blog app", () => {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("username");
      cy.get("#password").type("password");
      cy.contains("login").click();
      cy.contains("Welcome");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrongusername");
      cy.get("#password").type("wrongpassword");
      cy.contains("login").click();
      cy.contains("Log in to application");
    });

    describe("When logged in", function () {
      beforeEach(function () {
        cy.get("#username").type("username");
        cy.get("#password").type("password");
        cy.contains("login").click();
      });

      it("A blog can be created", function () {
        cy.get("#create-btn").click();
        cy.get("#title").type("test title");
        cy.get("#author").type("test author");
        cy.get("#url").type("www.testurl.com");
        cy.get("#postblog-btn").click();
        cy.contains("a new blog");
      });
    });
  });
});
