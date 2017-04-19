import React from 'react'
import Landing from './auth/landing'
import MainPage from './main/main'
import Profile from './profile/profile'
import { connect } from 'react-redux'

//My solution to a single page application. Put the location
//into the reducer to keep track of its state

const MAIN_PAGE = 'main'
const PROFILE_PAGE = 'profile'
const LANDING = 'landing'

const App = ({location}) => {
    if (location == MAIN_PAGE) {
        return <MainPage />
    }
    else if (location == PROFILE_PAGE) {
        return <Profile />
    }
    else {
        return <Landing />
    }
}

export default connect(
    (state) => {
        return {
            location: state.LocationReducer.location
        }
    }, null
)(App)
