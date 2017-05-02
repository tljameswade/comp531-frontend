import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'sq6test',
    password: 'support-vapor-unusual'
}

exports.login = () =>
    sleep(500)
        .then(findId('loginusername').clear())
        .then(findId('loginpassword').clear())
        .then(findId('loginusername').sendKeys(exports.creds.username))
        .then(findId('loginpassword').sendKeys(exports.creds.password))
        .then(findId('loginbutton').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findId('logoutbutton').click())
    .then(sleep(2000))
    .then(expect(findId('loginbutton')).to.exist)
    .then(expect(findId('loginusername')).to.exist)
    .then(expect(findId('loginpassword')).to.exist)
    .then(sleep(2000))
