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

    cy.visit('http://localhost:5173/');
  });

  it('Recieves users and articles from the api', () => {
    cy.wait('@apiArticles').then((req) => {
      assert.isNotNull(req?.response?.body.articles);
    });

    cy.wait('@apiUsers').then((req) => {
      assert.isNotNull(req?.response?.body.users);
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

describe("Articles", () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'https://hc-nc-news-api.onrender.com/api/articles'
    }).as('apiArticles');

    cy.intercept({
      method: 'GET',
      url: 'https://hc-nc-news-api.onrender.com/api/topics'
    }).as('apiTopics');

    cy.visit('http://localhost:5173/articles');
  });

  it("Recieves Articles and Topics from the API", () => {
    cy.wait('@apiArticles').then((req) => {
      assert.isNotNull(req?.response?.body.articles);
    });

    cy.wait('@apiTopics').then(req => {
      console.log(req?.response?.body);
      assert.isNotNull(req?.response?.body.topics);
    });
  });
});