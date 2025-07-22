
describe('Update Todo Test', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the main page
        cy.get('#username').type('admin'); // Log in as admin
        cy.get('#password').type('password123');
        cy.get('#login').click();
    });

    it('Add Todo for Update', () => {
       cy.get('#todo-input').type('Todo to be Updated');
        cy.get('.todo__form > button').click();
        
    });

    it('Update Todo Title', () => {

        

        cy.get('.todo__container').should('contain', 'Todo to be Updated');
        cy.get('.todo__container').contains('Updated').parent().find('button').contains('Edit').click();
        cy.get('#edit-input').clear().type('Updated Todo Title');
        cy.get('#update').click();
        cy.get('.todo__container').should('contain', 'Updated Todo Title');
    });

    it('Cancel Update Todo', () => {
        cy.get('.todo__container').should('contain', 'Updated Todo Title');
        cy.get('.todo__container').contains('Updated').parent().find('button').contains('Edit').click();
        cy.get('#edit-input').clear().type('Cancelled Update');
        cy.get('#cancel').click();
        cy.get('.todo__container').should('contain', 'Updated Todo Title');
    });

    it('Toggle Todo Completion', () => {        
        cy.get('.todo__container').should('contain', 'Updated Todo Title');
        cy.get('.todo__container').contains('Updated Todo Title').parent().find('input[type="checkbox"]').check();
        cy.get('.todo__container').contains('Updated Todo Title').parent().find('span').should('have.css', 'text-decoration-line', 'line-through');
    });
});