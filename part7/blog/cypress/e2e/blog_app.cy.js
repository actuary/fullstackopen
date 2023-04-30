describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Daniel Vdog',
      username: 'dvdog',
      password: 'abc123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user) 
    const user2 = {
      name: 'Daniel Vdog',
      username: 'dvdog2',
      password: 'abc123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2) 
    cy.visit('')
  })

  it('Login form is shown', function() {
      cy.contains('blogs')
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
      cy.get('#username')
      cy.get('#password')
      cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('dvdog')
      cy.get('#password').type('abc123')
      cy.get('#login-button').click()

      cy.contains('Daniel Vdog is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('dvdog')
      cy.get('#password').type('abc321')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })
  })  

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'dvdog', password: 'abc123' })
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#new-blog-title').type('the best blog')
      cy.get('#new-blog-author').type('HELLO')
      cy.get('#new-blog-url').type('www.newblog.com')
      cy.get('#create-new-blog').click()

      cy.contains('added the best blog by HELLO')
      cy.contains('the best blog by HELLO')
      cy.contains('show')
    })

    describe('When there are blogs shown', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'andrew', url: 'www.blog1.com' })
        cy.createBlog({ title: 'second blog', author: 'billy', url: 'www.blog2.com' })
        cy.createBlog({ title: 'third blog', author: 'chris', url: 'www.blog3.com' })
        cy.login({ username: 'dvdog2', password: 'abc123'})
        cy.createBlog({ title: 'fourth blog', author: 'daniel', url: 'www.blog4.com' })
        cy.login({ username: 'dvdog', password: 'abc123'})
      })
  
      it('can like a blog', function () {
        cy.contains('second blog by billy')
          .contains('show')
          .click()
  
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('can delete your own blog', function() {
        cy.contains('second blog by billy')
          .contains('show')
          .click()

        cy.contains('Remove').click()

        cy.contains('second blog by billy').should('not.exist')
      })

      it('cannot see delete button for anyone elses blog', function() {
        cy.contains('fourth blog by daniel')
          .contains('show')
          .click()
        cy.contains('Remove').should('not.exist')

      })
    })
  })

})