describe('The Notes App Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
  })
})

describe('create new note', () => {
  it('Register new user and redirect to signup page', () => {
    cy.visit('/')
    //get input field by id and type given param with delay speed of      100
    cy.get("#content").type("cy testing note", {delay: 100});
    cy.get("#submit-note").click();

  })
})

describe('mark importance of note', () => {
  it('marks note important or not important', () => {
    cy.visit('/')

    cy.get("li").contains("cy testing note").within(() => {
      cy.get('.impbtn').click()
    })

  })
})

describe('delete note', () => {
  it('deletes note', () => {
    cy.visit('/')

    cy.get("li").contains("cy testing note").within(() => {
      cy.get('.delbtn').click()
    })

  })
})

describe('toggle imporant notes', () => {
  it('toggles show all button to show imporant notes or all notes ', () => {
    cy.visit('/')

    cy.get('#shwbtn').click()
    
  })
})