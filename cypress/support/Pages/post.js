import { faker } from "@faker-js/faker";



class post {

requestPost4() {
    return cy.request({
        method: 'POST',
        url: '/664/posts',
        failOnStatusCode: false,
      })  
}

post4() {
    this.requestPost4().then( POST4 => {
        expect(POST4.status).to.be.equal(401)
    })
}

} export default new post()