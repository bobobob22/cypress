it('should create a form', function () {
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

    //adding form
    cy.get('#cypress-list-view button').click();
    cy.url().should('include', '/create-survey');
    cy.get('#cypress-create-form input').type('cypress test form');
    cy.get("#cypress-short-title input").type("cypress short title");
    cy.get('#cypress-add-question').should('have.length', 0)

    const cypressForm = cy.get('#cypres-layout-6');
    //button to add open question
    cypressForm.find('button').eq(1).click();
    cy.get('#cypress-add-question').should('have.length', 1)
    cy.get('#cypress-add-question').find('input').type('Czy podobał ci się przedmiot projekt inzynierski?')
    cy.get('#cypres-layout-6').find('button').eq(0).click();
    cy.url().should('include', '/surveys');

    cy.get('#cypress-result-table').find('tr').last().find('td').eq(1).find('span').contains('cypress test form') 

    //logout
    cy.get('#cypress-sign-out').click();
    cy.url().should('include', '/login')

  })