describe("Blog app", () => {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });
});
