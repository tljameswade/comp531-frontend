import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findClassName, findAllCSS } from './selenium'
import common from './common'

const webdriver = require('selenium-webdriver')

describe('Test main page functions', () => { 
    const preamble = 'you are logged in as'

    before('log in', done => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', done => {
        sleep(500)
        .then(expect(findId('greetingGuest')).to.exist)
        .then(done)
    })

    it('should post a new article', done => {
        findId('newarticletext').clear()
        .then(findId('newarticletext').sendKeys('a new article'))
        .then(findId('articlesubmit').click())
        .then(sleep(500))
        .then(findId('articleText').getText()
            .then(text => {
                expect(text).to.eql('a new article')
            }))
        .then(sleep(500))
        .then(done)
    })

    it('should edit an article and validate the article text has updated', done => {
        findId('articleText').getText()
        .then(text => {
            const editedText = text + ' Edited article!'
            findId('articleText').clear()
            findId('articleText').sendKeys(editedText)
            findId('edittextbutton').click()
            sleep(500)
            findId('articleText').getText()
                .then(newText => {
                    expect(newText).to.eql(editedText)
                })
        })      
        .then(sleep(500))
        .then(done)
    })

    it('should update the status headline and verify the change', done => {
        const oldHeadline = 'an old headline'
        const newHeadline = 'a new headline'
        findId('newstatus').sendKeys(oldHeadline)
        .then(findId('submitheadline').click())
        .then(sleep(500))
        .then(findId('headlinestatus').getText()
            .then(text => {
                expect(text).to.eql('I am: ' + oldHeadline)
            }))
        .then(findId('newstatus').clear())
        .then(findId('newstatus').sendKeys(newHeadline))
        .then(findId('submitheadline').click())
        .then(sleep(500))
        .then(findId('headlinestatus').getText()
            .then(text => {expect(text).to.eql('I am: ' + newHeadline)}))
        .then(sleep(500))
        .then(done)
    })

    it('should count the number of followed users', done => {
        findAllCSS('[name = "followers"]')
        .then(followers => {
            expect(followers.length).to.be.above(0)
        })
        .then(sleep(500))
        .then(done)
    })

    it('should add the user "Follower" to the list of followed users and verify the count increases by one', done => {
        findAllCSS('[name = "followers"]')
        .then(followers => {
            const numfollowers = followers.length
            expect(followers.length).to.be.above(0)
            findId('newfollower').clear()
            findId('newfollower').sendKeys("Follower")
            findId('addfollowerbutton').click()
            sleep(500)
            findAllCSS('[name = "followers"]')
            .then(followers => {
                expect(followers.length).to.eql(numfollowers + 1)
            })
        }).then(done)
    })

    it('should remove the user "Follower" from the list of followed users and verify the count decreases by one', done => {
        findAllCSS('[name = "followers"]')
        .then(followers => {
            const numfollowers = followers.length
            expect(followers.length).to.be.above(0)
            findId('unfollowbutton').click()
            sleep(500)
            findAllCSS('[name = "followers"]')
            .then(followers => {
                expect(followers.length).to.eql(numfollowers - 1)
            })
        }).then(done)
    })

    it('Search for "Only One Article Like This" and verify only one article shows, and verify the author', done => {
        findId('searchbar').clear()
        .then(findId('searchbar').sendKeys('Only One Article Like This'))
        .then(sleep(1000))
        .then(findAllCSS('[id = "articleAuthor"]')
            .then(articles => {
                expect(articles.length).to.eql(1)
            }))
        .then(findId('articleAuthor').getText()
            .then(text => {
                expect(text).to.eql('sq6test')
            }))
        .then(done)
    })

    it("should navigate to the profile view, Update the user's email and verify", done => {
        findId('profilebutton').click()
        .then(sleep(500))
        .then(expect(findId('navMainButton')).to.exist)
        .then(expect(findId('logoutbutton')).to.exist)
        .then(findId('profileemailupdate').clear())
        .then(findId('profileemailupdate').sendKeys('oldemail@rice.edu'))
        .then(findId('updatebutton').click())
        .then(sleep(500))
        .then(findId('curremailaddress').getText()
            .then(text => {
                expect(text).to.eql('Email: oldemail@rice.edu')
            }))
        .then(findId('profileemailupdate').clear())
        .then(findId('profileemailupdate').sendKeys('updatedemail@rice.edu'))
        .then(findId('updatebutton').click())
        .then(sleep(500))
        .then(findId('curremailaddress').getText()
            .then(text => {
                expect(text).to.eql('Email: updatedemail@rice.edu')
            }))
        .then(done)
    })

    it("should navigate to the profile view, Update the user's zipcode and verify", done => {
        findId('zipcodeupdate').clear()
        .then(findId('zipcodeupdate').sendKeys('11111'))
        .then(findId('updatebutton').click())
        .then(sleep(500))
        .then(findId('currzipcode').getText()
            .then(text => {
                expect(text).to.eql('Zipcode: 11111')
            }))
        .then(findId('zipcodeupdate').clear())
        .then(findId('zipcodeupdate').sendKeys('22222'))
        .then(findId('updatebutton').click())
        .then(sleep(500))
        .then(findId('currzipcode').getText()
            .then(text => {
                expect(text).to.eql('Zipcode: 22222')
            }))
        .then(done)
    })

    it('should navigate to the profile view, Update the password, verify a "will not change" message is returned', done => {
        findId('pswordupdate').clear()
        .then(findId('pswordupdate').sendKeys('UpdatedPassword'))
        .then(findId('psconfupdate').sendKeys('UpdatedPassword'))
        .then(findId('updatebutton').click())
        .then(sleep(500))
        .then(findId('passwordalert').getText()
            .then(text => {
                expect(text).to.eql('Will not update')
            }))
        .then(done)
    })

    after('log out', done => {
        sleep(500)
        .then(common.logout).then(done)
    })
})