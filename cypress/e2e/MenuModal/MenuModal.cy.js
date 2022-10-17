describe('Menu Modal Tests', () => {
  beforeEach(()=>{
    //go to website and get the second board
    cy.visit('http://localhost:3000/')
    cy.get('.board-container')
    .eq(1)
    .within(() => {
      cy.get('.card')
      .click()
    })
  })
  
  it('Can Edit Title', () => {

    //type into input
    cy.get('.MuiInput-input')
    .click()
    .type('{selectAll}changed')
    .blur()
    
    cy.get('button').contains(' Confirm ').click()

    cy.get('.board-container')
    .eq(1)
    .within(() => {
      cy.get('.card')
      .contains('changed')
    })

  })

  it('Can Edit Description', () => {

    //change description
    cy.get('textarea')
    .eq(0)
    .click()
    .type('{selectAll}changed')
    .blur()

    //save and close
    cy.get('button').contains(' Confirm ').click()

    //open to ensure it is still there
    cy.get('.board-container')
    .eq(1)
    .within(() => {
      cy.get('.card')
      .click()
    })
    
    cy.get('textarea')
    .contains("changed")
  })

  it('Can Edit Date', () => {
    //setup mockDate
    const now = new Date(2022, 5, 24)
    cy.clock(now)

    //click the + to open date modal
    cy.get('.header-bar').contains('Date').parent().contains('+').click()

    //shows the correct date and click a date
    cy.get('.selector-modal').contains('Jun')
    cy.get('.selector-modal').contains('25').click({force: true})

    cy.get('.header-bar').contains('Date').parent().contains('-').click()
    cy.get('.selector-modal').should('not.exist')

    //check dates
    cy.get('.date-container').contains('Due: 6/25')
    cy.get('.date-container').contains('Updated: 6/24')

    //make sure it saved
    cy.get('button').contains(' Confirm ').click()
    cy.get('.board-container').eq(1)
    .within(() => {
      cy.get('.card')
      .click()
    })
    cy.get('.date-container').contains('Due: 6/25')
    cy.get('.date-container').contains('Updated: 6/24')
  })

  it("Can Edit Assignees", () => {
    //open modal
    cy.get('.header-bar').contains("Assignees").parent().contains('+').click()

    //NOTE using force parameter because otherwise it will not click although it is a visible element
    //click checkbox with "Phillip Bell"
    cy.get('.selector-modal').contains("Phillip Bell").scrollIntoView().click({force: true}).children('.Mui-checked')
    
    //make sure the assignees are inside of modal now
    cy.get('.header-bar').contains("Phillip Bell")
    cy.get('.header-bar').contains("Nelly Grigoryan")

    //remove Nelly Grigoryan from modal to insure it can also remove
    cy.get('.selector-modal').contains("Nelly Grigoryan").scrollIntoView().click({force: true}).children('Mui-checked').should('not.exist')

    //close modal
    cy.get('.header-bar').contains("Assignees").parent().contains('-').click()
    cy.get('selector-modal').should('not.exist')
    
    //insure it saved
    cy.get('button').contains(' Confirm ').click()
    cy.get('.board-container')
    .eq(1)
    .within(() => {
      cy.get('.card')
      .click()
    })
    cy.get('.header-bar').contains("Phillip Bell")
    cy.get('.header-bar').contains("Nelly Grigoryan").should('not.exist')
  })

  it("Can Edit Board", () => {
    //change the board and save
    cy.get('.MuiSelect-select').click()
    cy.get('.MuiList-root').contains('In Review').click()
    cy.get('button').contains(' Confirm ').click()

    //insure that the board has 2 cards in it
    cy.get('.board-container').contains("In Review").parentsUntil('.project-container')
    .within(() => {
      cy.get('.card').eq(1).click()
    })
  })
})