import React from 'react'
import { connect } from 'react-redux'
import { navToMain } from './profileActions'
import { navToLanding } from '../main/mainactions'
import { updateProfileImg } from './profileActions'

//The part which shows the profile picture, nav to Main page button and an
//upload new picture button
const Avatar = ({avatar, navToMain, navToLanding, updateProfileImg}) => {

    let inputImg

    const uploadImg = (e) => {
        e.preventDefault()

        inputImg = e.target.files[0]
    }
    return (
        <div className="col-md-4">
            <div className="row" id="navMainButton">
                <div className="col-md-5">
                    <input type="submit" className="btn btn-primary btn-lg" value="Main Page"
                    onClick={() => navToMain()} />                  
                </div>
                <div className="col-md-5">
                    <input type="submit" id="logoutbutton" className="btn btn-primary btn-lg" value="Log Out"
                    onClick={() => navToLanding()} />  
                </div>
                <br />
                <div className="col-md-12">
                    <img id='profileimg' src={avatar} />
                </div>
                <div className="row" id="profileUpload">
                    <input type="file" value="Upload new picture" onChange={ (e) => uploadImg(e) }/>
                    <button onClick={ () => updateProfileImg(inputImg) }>Upload Profile Image</button>
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            avatar: state.RegisterReducer.avatar
        }
    },
    (dispatch) => {
        return {
            navToLanding: () => dispatch(navToLanding()),
            navToMain: () => dispatch(navToMain()),
            updateProfileImg: (img) => dispatch(updateProfileImg(img))
        }
    }
)(Avatar)
