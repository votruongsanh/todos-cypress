import TodoApp from "../../../src/components/todos/TodoApp";

describe("TodoApp.cy.js", () => {
  beforeEach(() => {
    cy.mount(<TodoApp />);
  });
  it("mounts", () => {
    cy.focused().should("have.class", "new-todo");
  });
  it("accept input", () => {
    const valueInput = "Buy Milk";
    cy.get(".new-todo").type(valueInput).should("have.value", valueInput);
  });

  context("Form submit", () => {
    it("Add a new too on submit", () => {
      const itemText = "Buy eggs";
      cy.intercept("POST", "http://localhost:8000/todos", {
        id: Date.now(),
        name: itemText,
        isComplete: false,
      }).as("createTodo");

      cy.get(".new-todo")
        .type(itemText)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".todo-list li").should("have.length", 1).and("contain", itemText);
    });

    it.only("shows an error message on a failed submission", () => {
      cy.intercept("POST", "http://localhost:8000/todos", {
        statusCode: 500,
        body: {},
      });
      cy.get(".new-todo").type("test{enter}");
      cy.get(".todo-list li").should("not.exist");
      cy.get(".error").should("be.visible");
    });
  });
});