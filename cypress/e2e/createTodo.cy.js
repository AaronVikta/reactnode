
describe('Create Todo Test', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the main page
        cy.get('#username').type('admin'); // Log in as admin
        cy.get('#password').type('password123');
        cy.get('#login').click();
    });
    
    it('Cannot Add Empty Todo', () => {
        cy.get('#todo-input')
        cy.get('#add-todo').click();
        cy.wait(500); 
       cy.get('.error__message').should('contain', 'Invalid todo format. Title is required.');
    })

    it('Add New Todo', () => {
       cy.get('#todo-input').type('Sample Todo 1');
        cy.get('.todo__form > button').click();
        cy.get('.todo__container').should('contain', 'Sample Todo 1');
    });
})