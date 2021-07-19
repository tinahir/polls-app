describe("Question details", () => {
  it("should be possible to go back to list", () => {
    cy.visit("/questions");

    cy.get('[data-test="question"]').first().click();

    cy.get('[data-test="question-name"]');
    cy.get('[data-test="choice-name"]');
    cy.get('[data-test="choice-votes"]');
    cy.get('[data-test="choice-percentage"]');

    cy.get('[data-test="choice-select"]').first().click();
    cy.get('[data-test="save-vote"]').first().click();

    cy.get('[data-test="back"]').click();

    cy.get('[data-test="question"]');
  });
});
