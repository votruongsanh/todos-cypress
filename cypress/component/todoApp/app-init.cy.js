import TodoApp from "../../../src/components/todos/TodoApp";

describe("App initialization", () => {
  beforeEach(() => {
    cy.mount(<TodoApp />);
  });
  it("Loads todos on pages load", () => {
    cy.seedData();
    cy.get(".todo-list li").should("have.length", 4);
  });

  it.only("Display an error on failure", () => {
    cy.intercept("GET", "http://localhost:8000/todos", {
      statusCode: 500,
      response: {},
    });
    cy.get(".todo-list li").should("not.exist");
    cy.get(".error").should("be.visible");
  });
});
