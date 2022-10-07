import TodoForm from "../../src/components/TodoForm";

describe("TodoForm.cy.js", () => {
  it("mount todo form", () => {
    cy.mount(<TodoForm />);

    cy.focused().should("have.class", "new-todo");
  });
});
