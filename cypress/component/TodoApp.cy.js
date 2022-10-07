import TodoApp from "../../src/components/TodoApp";

describe("TodoApp.cy.js", () => {
  it("mounts", () => {
    cy.focused().should("have.class", "new-todo");
  });
});
