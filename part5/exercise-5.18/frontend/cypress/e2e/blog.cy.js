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
  });
});
