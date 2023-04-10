describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Daniel Vdog',
      username: 'dvdog',
      password: 'abc123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user) 
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can login', function () {
    cy.contains('Login').click()
    cy.get('#username').type('dvdog')
    cy.get('#password').type('abc123')
    cy.get('#login-button').click()

    cy.contains('Daniel Vdog logged in')
  })  

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ 
        username: 'dvdog', password: 'abc123'
      })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#note-content').type('a note created by cypress')
      cy.get('#create-note-button').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
  
      it('one of those can be made important', function () {
        cy.contains('second note')
          .contains('make important')
          .click()
  
        cy.contains('second note')
          .contains('make not important')
      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('Login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Daniel Vdog logged in')
  })
})