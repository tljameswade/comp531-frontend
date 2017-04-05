import React from 'react'
import { connect } from 'react-redux'
import EachFollower from './eachfollower'
import { AddFollower } from './mainactions'

//The function to add the sidebar
const Following = ({followers, AddFollower, error}) => {
    let inputFollower;

    return(
        <div className="col-md-4" id="followingDiv">
            <div id="followingInfo">You are following: </div>
            <div>
                {
                    Object.keys(followers).sort().map(f => followers[f]).map(follower =>(
                        <EachFollower key={follower.name} name={follower.name}
                        imgloc={follower.image} status={follower.headline} />
                    ))
                }
            </div>
            <div className="input-group">
                <input id="newfollower" type="text" className="form-control" placeholder="Add a new follower"
                ref={(node) => inputFollower = node}/>
                <span className="input-group-btn">
                    <input id="addfollowerbutton" type="button" className="btn btn-success"
                    value="Add Follower" onClick={() => {
                        AddFollower(inputFollower.value)
                        inputFollower.value=''}} />
                </span>
            </div>
            <div>{error}</div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            followers: state.FollowReducer.followers,
            error: state.FollowReducer.error
        }
    },
    (dispatch) => {
        return {
            AddFollower: (newFollower) => dispatch(AddFollower(newFollower))
        }
    }
)(Following)
