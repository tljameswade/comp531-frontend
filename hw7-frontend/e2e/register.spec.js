import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findClassName, findAllCSS } from './selenium'
import common from './common'

describe('Test New User Registeration', () => {

    before('should register', (done) => {
        go().then(done)
    })

    it('should successfully register', (done) => {
        sleep(500)
        .then(findId('accountname').sendKeys('testaccountname'))
        .then(findId('dispname').sendKeys('testdispname'))
        .then(findId('emailaddress').sendKeys('test@rice.edu'))
        .then(findId('phonenumber').sendKeys('123-456-7890'))
        .then(findId('birthinfo').sendKeys('07101990'))
        .then(findId('zipcodeinfo').sendKeys('12345'))
        .then(findId('pswordinfo').sendKeys('qisuozhi123'))
        .then(findId('passconfinfo').sendKeys('qisuozhi123'))
        .then(findId('registerbutton').click())
        .then(sleep(500))
        .then(findId('registerinfo').then((e)=>{
            expect(e).to.exist
        }))
        .then(sleep(500))
        .then(done)
    })
})