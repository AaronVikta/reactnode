describe("Delete Todo",()=>{
    beforeEach(() => {
        cy.visit('/'); // Visit the main page
        cy.get('#username').type('admin'); // Log in as admin
        cy.get('#password').type('password123');
        cy.get('#login').click();
    });

   it('Todo to be Deleted', () => {
       cy.get('#todo-input').type('Todo to be Deleted');
        cy.get('.todo__form > button').click();
        
    });

    it("Delete Todo", () => {

        cy.wait(1000);
        cy.get('.todo__container').should('contain', 'Todo to be Deleted');
        cy.get('.todo__container').contains('Todo to be Deleted').parent().find('button').contains('X').click();
        cy.get('.todo__container').should('not.contain', 'Todo to be Deleted');
    });
})