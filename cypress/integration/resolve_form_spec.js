it('should resolve a form', function () {
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

    cy.get('#cypress-result-table').find('tr').last().find('td').eq(0).find('span').invoke('text').then((text) => {
        //logout
        cy.get('#cypress-sign-out').click();
        cy.url().should('include', '/login')
        cy.get('#cypress-solve-survey').should('have.length', 0)

        cy.clearCookies()
        cy.visit(`/surveys/${text.trim()}`, {
            onLoad: () => {
                console.log('load');
            }
        });
        cy.get('#cypress-solve-survey').should('have.length', 1)
        cy.get('#cypress-solve-survey').find('textarea').type('bardzo');

        cy.get('#cypres-layout-6').find('.cursor-pointer').eq(1).click();

        cy.get('#cypress-solve-survey-10').find('input').eq(0).type('Dawid Kwiaton')
        cy.get('#cypress-solve-survey-10').find('input').eq(1).type('daw.kwiaton@gmail.com')
        cy.get('#cypress-solve-survey-10').find('input').eq(2).type('140991')
        cy.get('#cypress-solve-survey-10').find('button').eq(0).click();

        cy.get('#cypress-thanks-view').find('span').contains('Dziękujemy za wypełnienie ankiety!') 
    });

  })