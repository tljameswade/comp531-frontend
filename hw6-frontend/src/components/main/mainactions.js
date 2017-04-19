import { resource } from '../../actions'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'


// The actions to get followers from the server
export const getFollowers = (method, name) => {
    
    return (dispatch, getState) => {
        if (method == 'PUT' && getState().FollowReducer.followers[name]) {
            return dispatch({ type: 'Error_Follow', error: `You have already follow ${name}` })
        } 
        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
            .then(r => {
                if (method == 'PUT' && r.following.indexOf(name) < 0){
                    return dispatch({ type: 'Error_Follow', error: `${name} does not exist` })
                }

                const _followers = r.following.reduce((o,v,i) => {o[v] = {name: v}; return o}, {})
                const followerList = r.following.join(',')

                const updateHeadline = resource('GET', `headlines/${followerList}`)
                    .then(r => {
                        r.headlines.forEach((u)=>{
                            const user = _followers[u.username]
                            if (user){
                                user.headline = u.headline
                            }
                        })
                    })
                
                const updateAvatar = resource('GET', `avatars/${followerList}`)
                    .then(r => {
                        r.avatars.forEach((u)=>{
                            const user = _followers[u.username]
                            if (user){
                                user.image = u.avatar
                            }
                        })
                    })

                Promise.all([updateHeadline, updateAvatar]).then(()=>{
                    dispatch({type:'Update_Followers', followers: _followers})
                })    
            }).catch(err => {
                dispatch({ type: 'Error_Follow', error: 'Error occurs in following!'})
            })
    }
} 

// The action to unfollow a follower
export const unfollow = (name) => {
    return getFollowers('DELETE', name)
}

// The action to add a follower
export const AddFollower = (name) => {
    return getFollowers('PUT', name)
}

// Thea action to add a new article
export const addNewPost = (author, message, image) => {
    const fd = new FormData()
    fd.append('text', message)
    fd.append('image', image)
    return (dispatch) => {
        resource('POST', 'article', fd, false)
            .then(r => {
                const newArticle = r.articles[0]
                dispatch({
                    type: 'Add_New_Article',
                    newArticle: newArticle
                })
            })
    }
}

// The action to navigate to the profile page
export const navToProfile = () => {
    return {
        type: 'To_Profile'
    }
}

// The action to logout
export const navToLanding = () => {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then(r => {
                dispatch({ type: 'To_Landing' })
            }).catch(err => {
                dispatch({ type: 'To_Main' })
            })
    }
}

// The action to update headline
export const updateHeadline = (name, headline) => {
    return (dispatch) => {
        const payload = {
            headline: headline
        }
        if (headline) {
            resource('PUT', 'headline', payload)
                .then(r => {
                    dispatch({
                        type: 'Update_Headline',
                        username: name,
                        headline: r.headline
                    })
                })
        }
    }
}