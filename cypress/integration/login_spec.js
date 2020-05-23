it('sets auth cookie when logging in via form submission', function () {

    cy.visit('/', {
        onLoad: () => {
            console.log('load');
        }
        
    });
    const email = "test@test.pl";
    const password = "nirvana12";

    cy.visit('/');
    cy.get('input').eq(0).type(email)
    cy.get('input').eq(1).type(password)
    cy.get('button').click();

    cy.url().should('include', '/')

    // UI should reflect this user being logged in
    cy.get('.text-gray-600').should('contain', 'UP Ankiety')


  })