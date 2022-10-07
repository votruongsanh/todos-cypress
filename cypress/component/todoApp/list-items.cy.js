import TodoApp from "../../../src/components/todos/TodoApp";

describe("List items", () => {
  beforeEach(() => {
    cy.mount(<TodoApp />);
    cy.seedData();
  });

  it("properly display completed items", () => {
    cy.get(".todo-list li")
      .filter(".completed")
      .should("have.length", 1)
      .and("contain", "Eggs")
      .find(".toggle")
      .should("be.checked");
  });

  it("show remaining todos in the footer", () => {
    cy.get(".todo-count").should("contain", 3);
  });

  it.only("remove a todo", () => {
    cy.intercept("DELETE", "http://localhost:8000/todos/1", {
      statusCode: 200,
      reponse: {},
    });

    cy.get(".todo-list li").as("list");
    cy.get("@list").first().find(".destroy").invoke("show").click();
    cy.get("@list").should("have.length", 3).and("not.contain", "Milk");
  });
});
