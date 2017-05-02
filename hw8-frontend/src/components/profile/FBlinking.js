import React from 'react'
import { connect } from 'react-redux'
import { linkToRegular } from './profileActions'
import { unlink } from './profileActions'

//The function to link or unlink facebook account to your own regular account
const FBlinking = ({username, password, dispatch, linkInfo, dispname}) => {
    return (
        <div id="fblinking">
            <h2>Link and Unlink Facebook</h2>
            <div>
                {dispname.indexOf('@') < 0 ? 
                <div>
                    <div><b>Login with Facebook account to link regular accounts</b></div>
                    <div>
                        <button className="btn btn-primary btn-lg" onClick={() => dispatch(unlink())}>UnLink Facebook</button>
                    </div>
                </div>:
                <div>
                    <form onSubmit={e=> {
                        e.preventDefault()
                        dispatch(linkToRegular(username.value, password.value))}}>
                        <div className="form-group">
                            <label>Regular username</label><br />
                            <input type="text" placeholder="James" ref={(node) => username = node} required />
                        </div>
                        <div className="form-group">
                            <label>Regular password</label><br />
                            <input type="password" ref={(node) => password = node} required />
                        </div>
                        <div>
                            <input type="submit" className="btn btn-primary btn-lg" value="Link" />
                        </div>
                    </form>
                    <div>
                        <button className="btn btn-primary btn-lg" onClick={() => dispatch(unlink())}>UnLink Facebook</button>
                    </div>
                </div>
                }
                <div>{ linkInfo }</div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            linkInfo: state.RegisterReducer.linkInfo,
            dispname: state.RegisterReducer.dispname
        }
    }, null
)(FBlinking)