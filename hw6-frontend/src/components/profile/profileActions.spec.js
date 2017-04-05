import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { url } from '../../actions'

describe('Validate Profile actions (mocked requests)', () => {

    let resource, updateHeadline, getProfile, Reducer
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').resource
            getProfile = require('./profileActions').getProfile
            updateHeadline = require('../main/mainactions').updateHeadline
            Reducer = require('../../reducer').default
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })

    it("should fetch the user's profile information", (done) => {
        mock(`${url}/email`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { email: 'sq6@rice.edu' }
        })

        mock(`${url}/zipcode`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { zipcode: '77005' }
        })

        mock(`${url}/dob`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { dob: '07-10-1990' }
        })
        
        mock(`${url}/avatars`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { avatars: [{avatar: 'someavatar', userename: 'somename'}] }
        })

        getProfile()(
            action => {
                expect(action).to.eql({ type: 'Profile_Update', email: 'sq6@rice.edu', zipcode: '77005', birth: '1990-7-10', avatar: 'someavatar' })
                done()
            }
        )
    })

    it('should update headline', (done) => {
  
  		const oldstate = {headlineReducer: {username: 'Scott', headline: 'No free time'}}

        mock(`${url}/headline`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json: { headline: 'A new headline!'}
        })

        const newUsername = 'sq6'
        const newHeadline = 'A new headline!'
        updateHeadline(newUsername, newHeadline)(
            action => {
                expect(action).to.eql({ type: 'Update_Headline', username: newUsername, headline: newHeadline })
                const newstate = Reducer(oldstate, action)
                expect(newstate.headlineReducer.username).to.eql(newUsername)
                expect(newstate.headlineReducer.headline).to.eql(newHeadline) 
                done()
            }
        )
	})
})