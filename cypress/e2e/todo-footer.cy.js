describe("Footer", () => {
  context("with a single todo", () => {
    it("display a signular todo in count", () => {
      cy.seedAndVisit([{ id: 1, name: "Buy Milk", isComplete: false }]);
      cy.get(".todo-count").should("contain", "1 todo left");
    });
  });

  context("with multiple todos", () => {
    beforeEach(() => {
      cy.seedAndVisit();
    });

    it("display plural todos in count", () => {
      cy.get(".todo-count").should("contain", "3 todos left");
    });

    it("filter to active todos", () => {
      cy.contains("Active").click();
      cy.get(".todo-list li").should("have.length", 3);
    });

    it("filter to completed todos", () => {
      cy.contains("Completed").click();
      cy.get(".todo-list li").should("have.length", 1);
    });

    it("filter to all todos", () => {
      cy.contains("All").click();
      cy.get(".todo-list li").should("have.length", 4);
    });

    it.only("handles filter links", () => {
      const filters = [
        { status: "Active", expectedLength: 3 },
        { status: "Completed", expectedLength: 1 },
        { status: "All", expectedLength: 4 },
      ];
      cy.wrap(filters).each((filter) => {
        cy.contains(filter.status).click();

        cy.get(".todo-list li").should("have.length", filter.expectedLength);
      });
    });
  });
});
