
describe('Login Test', () => {

  it('Password is Required', () => {    
    cy.visit('/')
    cy.get('#username').type('testuser')
    cy.get('#password')
    cy.get('#login').click()

    cy.get('p').should('contain', 'Password is required')
  })

  it('Username is Required', () => {    
    cy.visit('/')
    cy.get('#username')
    cy.get('#password').type('testpassword')
    cy.get('#login').click()

    cy.get('p').should('contain', 'Username is required')
  })  

  it('Invalid Username', () => {    
    cy.visit('/')
    cy.get('#username').type('invaliduser')
    cy.get('#password').type('password123')
    cy.get('#login').click()

    cy.get('p').should('contain', 'Invalid username')
  })

  it('Invalid Password', () => {
    cy.visit('/')
    cy.get('#username').type('admin')
    cy.get('#password').type('wrongpassword')
    cy.get('#login').click()

    cy.get('p').should('contain', 'Invalid password')
  })

  it('Successful Login', () => {
    cy.visit('/')
    cy.get('#username').type('admin')
    cy.get('#password').type('password123')
    cy.get('#login').click()

    cy.get('h1').should('contain', 'Todo') // Check if the Todos page is displayed
  })
})