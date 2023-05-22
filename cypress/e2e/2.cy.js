//faker
import { faker } from "@faker-js/faker"

//pages
import get from "../support/Pages/get"
import post from "../support/Pages/post"


let email = faker.internet.email({ provider: 'gmail.com', allowSpecialCharacters: false });
let password = faker.internet.password({ length: 10, memorable: true });


describe('Tests suite for API', () => {
  it.skip('GET request', () => {
    cy.log('**Get1 and Check Imformation**')
    get.get1()
    cy.log('**Get2 and Check Imformation**')
    get.get2()
    cy.log('**Get3 and Check Imformation**')
    get.get3()
  })
  it('POST4 request', () => {
    cy.log('**POST4 and Check Imformation**')
    post.post4()
  })
  it('POST5 request', () => {
    cy.log('**POST5 and Check Imformation**')
    cy.request({
      method: 'POST',
      url: '/register',
      body: {
        "email": email,
        "password": password
      }
    }).then(POST5 => {
      //console.log(POST5)
      cy.request({
        method: 'POST',
        url: '/664/posts',
        headers: {
          "Authorization": `Bearer ${POST5.body.accessToken}`
        }
      })
      expect(POST5.status).is.equal(201)
      expect(POST5.statusText).is.equal("Created")
      expect(POST5.isOkStatusCode).is.true
    })
  })
  it('POST6 request', () => {
    cy.log('**POST6 and Check Imformation**')
    cy.request({
      method: 'POST',
      url: '/register',
      body: {
        "email": `${email}+POST6`,
        "password": password
      }
    }).then(POST6 => {
      cy.log('**POST6 Authotiz**')
      //console.log(POST6)
      cy.request({
        method: 'POST',
        url: '/posts',
        headers: {
          "Authorization": `Bearer ${POST6.body.accessToken}`
        }
      })
      expect(POST6.status).is.equal(201)
      expect(POST6.statusText).is.equal("Created")
      expect(POST6.isOkStatusCode).is.true
    })
  })

  it('PUT7 Update non-existing entity. Verify HTTP response status code.', () => {
    cy.log('**PUT7**')
    cy.request({
      method: 'PUT',
      url: '/posts',
      body: {
        "email": email,
        "password": password
      },
      failOnStatusCode: false
     }).then(PUT7 => {
      cy.log('**Expect PUT7.status Authotiz**')
      expect(PUT7.status).is.equal(404)
     })
   
  })

  it('POST8+PUT8 Create a post entity and update the created entity. Verify HTTP response status code and verify that the entity is updated.', () => {
    cy.log('**POST8**')
    cy.request({
      method: 'POST',
      url: '/register',
      body: {
        "email": `${email}+POST8`,
        "password": password
      }
    }).then(POST8 => {
        cy.log('**POST8 Authoriz**')
        console.log(POST8)
        cy.request({
          method: 'POST',
          url: '/664/posts',
          headers: {
            "Authorization": `Bearer ${POST8.body.accessToken}`
          },
          body: {
            "newParam": 22
          }
        }).then(PUT8 => {
            //console.log(PUT8)
            cy.log('**PUT8 Expect**')
            expect(PUT8.status).is.equal(201)
            expect(PUT8.body.newParam).is.equal(22)

            cy.request({
            method: 'PUT',
            url: `/posts/${PUT8.body.id}`,
            body: {
              "newParam": 33
            }
            })
          }).then(PUT8expect => {
            expect(PUT8expect.status).is.equal(200)
            expect(PUT8expect.body.newParam).is.equal(33)
          })
    })
  })

  it('DELETE9 Delete non-existing post entity. Verify HTTP response status code', () => {
    cy.log('**DELETE9**')
    cy.request({
      method: 'DELETE',
      url: '/post',
      body: {
        "email": "dd",
        "password": "ddd"
      },
      failOnStatusCode: false
    }).then(DELETE9 => {
      expect(DELETE9.status).is.equal(404)
    })
  })

  it('POST10+PUT10+DELETE10 Create a post entity, update the created entity, and delete the entity. Verify HTTP response status code and verify that the entity is deleted.', ()=> {
    cy.log('**POST10**')
    cy.request({
      method: 'POST',
      url: '/register',
      body: {
        "email": `${email}+POST10`,
        "password": password
      }
    }).then(POST10 => {
        expect(POST10.status).is.equal(201)
        expect(POST10.statusText).is.equal("Created")
        expect(POST10.isOkStatusCode).is.true
        cy.log('**PUT10**')
        cy.request({
          method: 'POST',
          url: '/664/posts',
          headers: {
            "Authorization": `Bearer ${POST10.body.accessToken}`
            
          },
          body: {
            addNewParam: 'addNewParam'
          }
        })
      }).then(PUT10 => {
          expect(PUT10.body.addNewParam).is.equal('addNewParam')
          cy.request({
            method: "PUT",
            url: `/posts/${PUT10.body.id}`,
            body: {
              addNewParam: 'OLD Param'
            }
          })
      }).then(DELETE10 => {
        expect(DELETE10.body.addNewParam).is.equal('OLD Param')
        cy.request({
          method: 'DELETE',
          url: `/posts/${DELETE10.body.id}`
        })
      }).then(DELETE10check => {
        expect(DELETE10check.body.id).is.not.exist
      })
  })

})