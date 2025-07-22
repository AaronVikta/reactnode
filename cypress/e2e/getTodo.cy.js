

describe("Get Todo Test", () => {
    it("Get All Todos", () => {
        cy.visit("/"); // Visit the main page
        cy.get("#username").type("admin"); // Log in as admin
        cy.get("#password").type("password123");
        cy.get("#login").click();

        cy.get(".todo__container").should("contain", "Sample Todo");
    });
})