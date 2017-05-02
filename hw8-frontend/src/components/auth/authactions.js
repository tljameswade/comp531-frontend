import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { resource } from '../../actions'
import { getFollowers } from '../main/mainactions'
import { getArticles } from '../article/articleactions'
import { getProfile } from '../profile/profileActions'
import { navToMain } from '../profile/profileActions'


// The initial visit action
export const initVisit = () => {
    return (dispatch) => {
        resource('GET', 'headlines')
            .then(r => {
                dispatch({
                    type: 'Update_Headline',
                    headline: r.headlines[0].headline
                })
                dispatch({
                    type: 'Correct_Login',
                    username: r.headlines[0].username
                })
                dispatch(navToMain())
                dispatch(getProfile())
                dispatch(getArticles())
                dispatch(getFollowers())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// The action to update error message when login fails
export const updateError = (errorMsg) => {
    return {
        type: 'Fail_Login',
        loginInfo: errorMsg
    }
}

export const updateRegisterError = (errorMsg) => {
    return {
        type: 'Password_No_Match',
        registerInfo: errorMsg
    }
}

// The register action
export const register = ({accountname, dispname, email, phone, birth, zipcode, password, passconf}) => {
    if (password !== passconf) {
        return {
            type: 'Password_No_Match',
            registerInfo: 'Password must match!'
        }
    }
    else {
        return (dispatch) => {
            resource('POST', 'register', {
                username: dispname,
                email: email,
                dob: birth,
                zipcode: zipcode,
                password: password
            })
            .then(r => {
                dispatch({
                    type: 'Correct_Register',
                    accountname,
                    dispname,
                    email,
                    phone,
                    birth,
                    zipcode,
                    password,
                    registerInfo: 'You have correctly registered!'
                })
            }).catch( err => {
                console.log(err)
                dispatch(updateRegisterError("User exists!"))
            })
        }
    }
}


//The action to show wrong login information or to direct to main page
export const setLogin = (info, username, password) => {
    if (info == 'Empty') {
        return {
            type: 'Fail_Login',
            loginInfo: 'Please input the username and password!'
        }
    }
    else {
        return (dispatch) => {

            resource('POST', 'login', {username, password})
                .then( r => {
                    dispatch({ type: 'Correct_Login', username })
                    dispatch(initVisit())
                    
                }).catch(err => {
                    console.log(err)
                    dispatch(updateError("Wrong match of username and password!"))
                })
        }
    }
}

// Direct to the third party login
export const facebooklogin = () => {       
    window.top.location = 'https://comp531fullwebapp.herokuapp.com/login/facebook'
}

