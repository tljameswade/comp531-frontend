import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { url } from './actions'
import { setLogin } from './components/auth/authactions'
import { register } from './components/auth/authactions'
import { navToMain } from './components/profile/profileActions'
import { navToProfile } from './components/main/mainactions'
import { ToLanding } from './components/main/mainactions'
import { updateError } from './components/auth/authactions'



describe('Validate Actions', () => {

let resource

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('./actions').resource
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    }) 

	it('resource should be a resource (i.e., mock a request)', (done) => {
		mock(`${url}/sample`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
            json: {test: 'test'}
		})

		resource('GET', 'sample').then(r => {
			expect(r).to.exist
		}).then(done)
	})

	it('resource should give me the http error', (done) => {
		resource('GET', 'somerandomhttp').catch((error) => {
			expect(error).to.exist
		})
		.then(done)
		.catch(done)
    })

    it('resource should be POSTable', (done) => {

         const username = 'someusername'
         const password = 'somepassword'

         mock(`${url}/login`,{
             method: 'POST',
             headers: {'Content-Type':'application/json'},
             json: {username: username, password: password}
         })

         resource('POST', 'login', {username, password})
         .then(r => {
             expect(r.username).to.eql(username)
             expect(r.password).to.eql(password)
         })
         .then(done)
         .catch(done)
    })

	it('should update error message (for displaying error mesage to user)', () => {
		const expectAction = {
			type: 'Fail_Login',
			loginInfo: 'Error!'
		}
		expect(updateError('Error!')).to.eql(expectAction);
	})


	it('should update success message (for displaying success message to user)', () => {
		const expectedAction = {
			type: 'Correct_Register',
            accountname: 'randomaccount',
            dispname: 'randomdisp',
            email: 'random@rice.edu',
            phone: '123-123-1234',
            birth: '10-12-1990',
            zipcode: '77005',
            password: '12345',
            registerInfo: 'You have correctly registered!'
		}
		expect(register({
            accountname:'randomaccount', 
            dispname: 'randomdisp', 
            email: 'random@rice.edu', 
            phone: '123-123-1234', 
            birth: '10-12-1990', 
            zipcode: '77005', 
            password: '12345', 
            passconf: '12345'})).to.eql(expectedAction);
	})

	it('should navigate to profile, main, and landing', () => {
		expect(ToLanding()).to.eql({ type: 'To_Landing' });
		expect(navToMain()).to.eql({ type: 'To_Main' });
		expect(navToProfile()).to.eql({ type: 'To_Profile' });
	})

})
