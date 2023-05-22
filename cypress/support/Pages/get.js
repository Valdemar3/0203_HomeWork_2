//import * as get3verify from "../get3verify"

class get {

    requestGet1 () {
        return cy.request({
            method: 'GET',
            url: '/posts',
          })
        }

    requestGet2 () {
        return cy.request({
            method: 'GET',
            url: '/posts?_page=1&_limit=10',
          })
    }
    
    requestGet3 () {
        return cy.request({
            method: 'GET',
            url: '/posts?_start=54&_end=60',
          })
    }

    get1() {
        this.requestGet1().then( GET => {
            console.log(GET)
            expect(GET.isOkStatusCode).to.be.true
            expect(GET.status).to.be.equal(200)
            expect(GET.statusText).to.be.equal('OK')
            expect(GET.body).not.to.be.empty
          })
    }

    get2() {
        this.requestGet2().then( GET => {
            console.log(GET)
            expect(GET.isOkStatusCode).to.be.true
            expect(GET.status).to.be.equal(200)
            expect(GET.statusText).to.be.equal('OK')
            expect(GET.body).not.to.be.empty
            //expect(GET.body[10]).is.not.exist
            expect(GET.body).length.lessThan(11)
          })
    }
    
    get3() {
        this.requestGet3().then( GET => {
            console.log(GET)
            expect(GET.isOkStatusCode).to.be.true
            expect(GET.status).to.be.equal(200)
            expect(GET.statusText).to.be.equal('OK')
            expect(GET.body).not.to.be.empty
            for (let i=0; i<5; i++) {
                expect(GET.body[i].id).is.equal(i+55)
            }
          })
    }


} export default new get()