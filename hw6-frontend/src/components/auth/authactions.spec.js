import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { url } from '../../actions'


describe('Validate Authentication', () => {

let resource, Reducer, setLogin, navToLanding
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            setLogin = require('./authactions').setLogin
            resource = require('../../actions').resource
            navToLanding = require('../main/mainactions').navToLanding
            Reducer = require('../../reducer').default
            
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })
    

    it('should log in a user', (done)=>{

        const username = 'sq6'
        const password = 'maybe-treated-instead'


        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })

        let numVisit = 1
        let state

        setLogin('something',username, password)(
            (action) => {
                if (numVisit == 1) {
                    expect(action).to.eql({ type: 'Correct_Login', username })
                    state = Reducer({}, action)
                    expect(state.RegisterReducer.dispname).to.eql(username)
                    numVisit++
                }
                else if (numVisit == 2) {
                    expect(numVisit).to.eql(2)
                    numVisit++
                }
                else {
                    done()
                }                
            }
        )
    })

    it('should not log in an invalid user', (done)=>{

        const username = 'somename'
        const password = 'somepassword'


        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            status: 401,
            statusText: 'Unauthorized'
        })

     
        setLogin('something',username, password)(
            (action) => {
                expect(action).to.eql({ type:'Fail_Login', loginInfo: 'Wrong match of username and password!' })
                done()
            }
        )
    })
    
    it('should log out a user (state should be cleared)', (done)=>{
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'text/plain'},
            status:200
        })

        let state = { RegisterReducer: {dispname: 'sq6'} }

        navToLanding()(
            (action)=>{
                expect(action).to.eql({ type: 'To_Landing' })
                state = Reducer(state, action)
                expect(state.RegisterReducer.dispname).to.eql('')
                done()
            }
        )       
    })
}) 