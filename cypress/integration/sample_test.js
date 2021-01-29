// gives 'cy' variable errors but is runs as expected?
// the tests could be defined better; a lot of cleanup in project overall could be done, actually...

describe('instructions-fillout', function () {
  it('Add text to special instructions', function() {
      cy.visit('http://localhost:3000/pizza/');
      cy.get('[name="instructions"]').type('test text').should('have.value', 'test text');
  })
})

describe('mult-toppings', function () {
  it('Selects multiple toppings', function() {
      cy.visit('http://localhost:3000/pizza/');
      cy.get(':nth-child(6) > input').check().should('be.checked');
      cy.get(':nth-child(7) > input').check().should('be.checked');
      cy.get(':nth-child(8) > input').check().should('be.checked');
  })
})

describe('form-submit', function () {
  it('Submits the form', function() {
    cy.visit('http://localhost:3000/pizza/');
    cy.get('[name="name"]').type('Cory');
    cy.get('.form-component').submit()
  })
})