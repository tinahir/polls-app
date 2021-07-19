describe("List", () => {
  it("displays questions", () => {
    cy.visit("/questions");

    cy.get('[data-test="question"]').within(() => {
      cy.get('[data-test="question-published-at"]');
      cy.get('[data-test="question-choices"]');
    });
  });

  it("contains links to details", () => {
    cy.visit("/questions");

    cy.get('[data-test="question"]').first().click();

    cy.get('[data-test="question-name"]');
    cy.get('[data-test="choice-name"]');
    cy.get('[data-test="choice-votes"]');
    cy.get('[data-test="choice-percentage"]');

    cy.get('[data-test="choice-select"]').first().click();
    cy.get('[data-test="save-vote"]').first().click();
  });
});
