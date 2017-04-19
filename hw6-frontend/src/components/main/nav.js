import React from 'react'
import { connect } from 'react-redux'
import { navToProfile } from './mainactions'
import { navToLanding } from './mainactions'
import { updateHeadline } from './mainactions'

//The left upper corner component to show the profile image as well as
//buttons to navigate to profile page or to log out
const Navbar = ({avatar, navToLanding, navToProfile, ownname, ownheadline, updateHeadline}) => {
    let inputText;

    return(
        <div className="col-md-4 col-sm-12">
            <div className="btn-group btn-group-lg" role="group">
                <input id="logoutbutton" type="button" className="btn btn-primary"
                onClick={() => navToLanding()} value="Log Out" />
                <input id="profilebutton" type="button" className="btn btn-primary"
                onClick={() => navToProfile()} value="Profile" />
            </div>
            <div>
                <img id="navProfileImg" src={avatar} />
                <div id="greetingGuest">Hello, <b>{ownname}</b></div>
                <p id="headlinestatus" className="activestatus">I am: <b>{ownheadline}</b></p>
            </div>
            <div className="input-group updateStatusInput">
                <input id="newstatus" type="text" className="form-control" placeholder="New Status"
                ref={(node) => inputText = node}/>
                <input id="submitheadline" type="submit" value="Update" className="btn btn-success" onClick={() => {
                    updateHeadline(ownname, inputText.value)
                    inputText.value=''}}/>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            ownname: state.RegisterReducer.dispname,
            ownheadline: state.headlineReducer.headline,
            avatar: state.RegisterReducer.avatar
        }
    },
    (dispatch) => {
        return {
            navToProfile: () => dispatch(navToProfile()),
            navToLanding: () => dispatch(navToLanding()),
            updateHeadline: (name, text) => dispatch(updateHeadline(name, text))
        }
    }
)(Navbar)
