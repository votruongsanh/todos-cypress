describe("smoke test", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8000/todos")
      .its("body")
      .each((todo) =>
        cy.request("DELETE", `http://localhost:8000/todos/${todo.id}`)
      );
  });

  context("with no todos", () => {
    it("saves new todo", () => {
      const items = [
        { text: "Buy milk", expectedLength: 1 },
        { text: "Buy eggs", expectedLength: 2 },
        { text: "Buy bread", expectedLength: 3 },
      ];

      cy.visit("http://localhost:3000/");
      cy.intercept("POST", "http://localhost:8000/todos").as("create");

      cy.wrap(items).each((todo) => {
        cy.focused().type(todo.text).type("{enter}");

        cy.wait("@create");

        cy.get(".todo-list li").should("have.length", todo.expectedLength);
      });
    });
  });

  context("with active todos", () => {
    beforeEach(() => {
      cy.fixture("todos").each((todo) => {
        const newTodo = Cypress._.merge(todo, { isComplete: false });
        cy.request("POST", "http://localhost:8000/todos", newTodo);
      });
      cy.visit("http://localhost:3000/");
    });

    it("Load existing data from the DB", () => {
      cy.get(".todo-list li").should("have.length", 4);
    });

    it("Deletes todos", () => {
      cy.intercept("DELETE", "http://localhost:8000/todos/*").as("delete");

      cy.get(".todo-list li")
        .each(($el) => {
          cy.wrap($el).find(".destroy").invoke("show").click();
          cy.wait("@delete");
        })
        .should("not.exist");
    });

    it("Toggles todos", () => {
      const clickAndAwait = ($el) => {
        cy.wrap($el).as("item").find(".toggle").click();
        cy.wait("@update");
      };

      cy.intercept("PUT", "http://localhost:8000/todos/*").as("update");

      cy.get(".todo-list li").each(($el) => {
        clickAndAwait($el);
        cy.get("@item").should("have.class", "completed");

        clickAndAwait($el);
        cy.get("@item").should("not.have.class", "completed");
      });
    });
  });
});
