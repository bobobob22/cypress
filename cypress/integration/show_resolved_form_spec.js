it('should show resolved forms', function () {
    cy.visit('/', {
        onLoad: () => {
            console.log('load');
        }
        
    });
    const email = "test@test.pl";
    const password = "nirvana12";

    //login
    cy.visit('/');
    cy.get('input').eq(0).type(email)
    cy.get('input').eq(1).type(password)
    cy.get('button').click();
    cy.url().should('include', '/')

    // UI should reflect this user being logged in
    cy.get('#cypres-layout').should('be.visible');

    // check if page with solutions is loaded
    cy.get('#cypress-answers-1').should('have.length', 0)
    cy.get('#cypress-result-table').find('tr').last().find('td').eq(6).find('span').eq(1).click();
    cy.get('#cypress-answers-1').should('have.length', 1);
  })