import React from 'react'
import Avatar from './avatar'
import CurrentInfo from './currentInfo'
import UpdateInfo from './profileForm'

//The profile page
const Profile = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Avatar />
                <div className="col-md-6" id='profileHeaddiv'>
                    <img src="http://68.media.tumblr.com/46a6ca9444b1972e3f291b3abb91146a/tumblr_ol8lip2HFO1w5304fo1_500.gif"
                    className="img-rounded" id='profileHeadpic' />
                </div>
            </div>
            <div className="row">
                <CurrentInfo />
                <div className="col-md-5">
                    <img src="http://www.improgrammer.net/wp-content/uploads/2015/01/The-Evolution-of-a-Programmer.png"
                    className="img-circle" id='profileHelperpic'/>
                </div>
                <UpdateInfo />
            </div>
        </div>
    )
}

export default Profile;
