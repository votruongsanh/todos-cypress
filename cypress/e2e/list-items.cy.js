describe("List items", () => {
  beforeEach(() => {
    cy.seedAndVisit();
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

  it("remove a todo", () => {
    cy.intercept("DELETE", "http://localhost:8000/todos/1", {
      statusCode: 200,
      reponse: {},
    });

    cy.get(".todo-list li").as("list");
    cy.get("@list").first().find(".destroy").invoke("show").click();
    cy.get("@list").should("have.length", 3).and("not.contain", "Milk");
  });

  it("Mark an incomplete item complete", () => {
    cy.fixture("todos").then((todos) => {
      const target = Cypress._.head(todos);
      cy.intercept(
        "PUT",
        `http://localhost:8000/todos/${target.id}`,
        Cypress._.merge(target, { isComplete: true })
      );
    });

    cy.get(".todo-list li").first().as("first-todo");
    cy.get("@first-todo").find(".toggle").click().should("be.checked");
    cy.get("@first-todo").should("have.class", "completed");
    cy.get(".todo-count").should("contain", 2);
  });
});
