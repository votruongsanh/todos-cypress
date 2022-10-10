describe("App initialization", () => {
  it("Loads todos on pages load", () => {
    cy.seedAndVisit();
    cy.get(".todo-list li").should("have.length", 4);
  });

  it("Display an error on failure", () => {
    cy.intercept("GET", "http://localhost:8000/todos", {
      statusCode: 500,
      response: {},
    });
    cy.visit("http://localhost:3000");
    cy.get(".todo-list li").should("not.exist");
    cy.get(".error").should("be.visible");
  });
});
