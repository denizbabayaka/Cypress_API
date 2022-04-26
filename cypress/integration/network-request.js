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

    it('Post Request', () => {
        // we are listening any post request with the url /comments and
        // store it into an alias called postComment

        cy.intercept("POST", "**/comments**",).as('postComment');
        cy.get('.network-post').click();

        cy.wait("@postComment").should(({ request, response }) => {
            console.log(request);

            expect(request.body).to.include('email', 'hello@cypress.io');
            console.log(response);
            expect(response.body).to.have.property("name", "Using POST in cy.intercept()");
            expect(request.headers).to.have.property("content-type");
            expect(request.headers).to.have.property("origin", "https://example.cypress.io");



        })


    })
})
