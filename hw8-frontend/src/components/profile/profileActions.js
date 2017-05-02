import { resource } from '../../actions'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

//The update action to update according to the input update info
export const update = ({email, phone, zipcode, password, passconf, location}) => {
    if (password !== passconf) {
        return {type: 'Password_No_Match', updateInfo: 'Passwords must match!'}
    }

    return (dispatch) => {
        if (email) {
            resource('PUT', 'email', {email})
                .then(r => {
                    dispatch({ type: 'Email_Update', email: email, updateInfo: "Updated!" })
                })
        }
        if (zipcode) {
            resource('PUT', 'zipcode', {zipcode})
                .then(r => {
                    dispatch({ type: 'Zipcode_Update', zipcode: zipcode, updateInfo: "Updated!" })
                })
        }
        if (password) {
            resource('PUT', 'password', {password})
                .then(r => {
                    dispatch({ type: 'Password_Update', updateInfo: "Updated!" })
                })
        }
    }
}

// The action to update profile avatar (image)
export const updateProfileImg = (img) => {
    const fd = new FormData()
    fd.append('image', img)
    return (dispatch) => {
        resource('PUT', 'avatar', fd, false)
            .then(r => {
                const avatar = r.avatar
                dispatch({
                    type: 'Update_Avatar',
                    avatar: avatar
                })
            })
    }
}

// The action to get profile information from the server
export const getProfile = () => {

    return (dispatch) => {
        const response = {}
        const avatar = resource('GET', 'avatars')
            .then(r => {
                response.avatar = r.avatars[0].avatar
            })
        const email = resource('GET', 'email')
            .then(r => {
                response.email = r.email
            })
        const zipcode = resource('GET', 'zipcode')
            .then(r => {
                response.zipcode = r.zipcode
            })
        const dob = resource('GET', 'dob')
            .then(r => {
                const birthDate = new Date(r.dob)
                response.birth = birthDate.toDateString()
            })

        Promise.all([avatar, email, zipcode, dob]).then(() => {
            dispatch({
                type: 'Profile_Update',
                email: response.email, 
                zipcode: response.zipcode,
                birth: response.birth,
                avatar: response.avatar
            })
        })
    }
}

// The action to navigate to the main page
export const navToMain = () => {
    return {
        type: 'To_Main'
    }
}

// The action to link to the regular account
export const linkToRegular = (username, password) => {
    return (dispatch) => {
        if (username && password) {
            resource('POST', 'linkregular', {inputUser: username, inputPass: password})
            .then(r => {
                dispatch({
                    type: 'Update_FBlink',
                    linkInfo: "Successfully Linked!"
                })
            }).catch(err => {
                dispatch({
                    type: 'Update_FBlink',
                    linkInfo: 'Error Linking!!!'                    
                })
            })
        }
    }
}

// The action to unlink fb account with regular account
export const unlink = () => {
    return (dispatch) => {
        resource('GET', 'unlinkregular')
        .then(r => {
            dispatch({
                type: 'Unlink_FB',
                linkInfo: r.linkInfo
            })
        }).catch(err => {
            dispatch({
                type: 'Update_FBlink',
                linkInfo: 'Error UnLinking!!!'                    
            })            
        })
    }
}
