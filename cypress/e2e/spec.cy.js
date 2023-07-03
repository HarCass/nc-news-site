describe('Home', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'https://hc-nc-news-api.onrender.com/api/articles?limit=5'
    }).as('apiArticles');

    cy.intercept({
      method: 'GET',
      url: 'https://hc-nc-news-api.onrender.com/api/users'
    }).as('apiUsers');

    cy.visit('http://192.168.1.14:5173/');
  });

  it('Recieves users and articles from the api', () => {
    cy.wait('@apiArticles').then((req) => {
      assert.isNotNull(req.response.body);
    });

    cy.wait('@apiUsers').then((req) => {
      assert.isNotNull(req.response.body);
    });
  });

  it('Allows user to sign in', () => {
    cy.wait(['@apiArticles', '@apiUsers']);

    cy.get('#user-selector').select('grumpy19');
    cy.get('form > button').click();
    cy.get('.home > :nth-child(5)').contains('Welcome grumpy19!');
  });

  it('Allows user to logout when signed in', () => {
    cy.wait(['@apiArticles', '@apiUsers']);

    cy.get('#user-selector').select('grumpy19');
    cy.get('form > button').click();
    cy.get('.home > :nth-child(5)').contains('Welcome grumpy19!');

    cy.get('.home > :nth-child(4)').click();
    cy.get('.home > a').contains('Or Sign Up Here!');
  });
});