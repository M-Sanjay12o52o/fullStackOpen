describe("Blog app", () => {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  // Mocking the API to avoid actual blog creation
  // beforeEach(function () {
  //   cy.intercept("POST", "/api/blogs", {
  //     statusCode: 201,
  //     body: {
  //       title: "Mocked Blog Title",
  //       author: "Mocked Author",
  //       url: "www.mockedurl.com",
  //     },
  //   }).as("createBlog");
  // });

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
      let blogTitle;

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
        cy.contains("a new blog").then(($title) => {
          blogTitle = $title.text();
        });
      });

      it("A blog can be liked", function () {
        cy.get(".viewBtn").first().click();
        cy.get(".likeBtn").first().click();

        cy.get(".like-count")
          .should("exist")
          .then(($likeCount) => {
            const initialLikes = parseInt($likeCount.text());

            cy.get(".likeBtn").first().click();

            cy.get(".like-count").should(($updatedLikeCount) => {
              const updatedLikes = parseInt($updatedLikeCount.text());
              expect(updatedLikes).to.eq(initialLikes + 1);
            });
          });
      });

      it("user who craeted the blog can delete it", function () {
        cy.get(".viewBtn:visible").then((buttons) => {
          const initialBlogCount = buttons.length;
          cy.log(
            `There are ${initialBlogCount} view buttons visible on the screen.`
          );

          cy.get(".viewBtn").last().click();
          cy.get(".removeBtn").should("be.visible");
          cy.get(".removeBtn").click();

          cy.get(".viewBtn").should("have.length", initialBlogCount - 1);
        });
      });
    });
  });
});
