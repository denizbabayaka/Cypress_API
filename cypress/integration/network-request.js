/// <reference types="cypress" />

describe('Network Request', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests')
    })

    it('Get Request', () => {

        cy.intercept({
            method: 'GET',
            //this will look for the any url that has comments at the end of it
            url: '**/comments/*',
        },
        // here we mock the response body with a json object
        // this will be the new response body of the intercepted request
            {

                body: {
                    postId: 1,
                    id: 1,
                    name: " test name 123 ",
                    email: " joe_blogs123@test.com ",
                    body: " Hello world "

                }

                // this will return the all get objects  comments from the url and
                //assing it to the getComment variable
            }).as('getComment');

        cy.get('.network-btn').click();

        cy.wait('@getComment').its('response.statusCode').should('eq', 200);
    })

})
