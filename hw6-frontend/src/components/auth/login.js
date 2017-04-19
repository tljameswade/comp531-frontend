import React from 'react'
import { setLogin } from './authactions'
import { connect } from 'react-redux'

//Variable to store the info input (user name and password)
let loginacc, loginpass

const Login = ({setLogin, loginInfo}) => {
    return (
        <div className='col-md-3' id="loginDiv">
            <div>
                <h2>Log in here</h2>
                <form>
                    <div className="form-group">
                        <label>User Name</label><br />
                        <input id="loginusername" type="text" ref={(node) => loginacc = node} />
                    </div>
                    <div className="form-group">
                        <label>Password</label><br />
                        <input id="loginpassword" type="password" ref={(node) => loginpass = node} />
                    </div>
                    <div className="landingAlert">{ loginInfo }</div>
                    <div>
                        <input id="loginbutton" type="button" className="btn btn-primary btn-lg"
                        value="Log in" onClick={() => validate(setLogin, loginacc, loginpass)}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

//The validate function to make sure that the input user name and password are not
// empty value
const validate = (setLogin, loginacc, loginpass) => {
    if (loginacc.value === '' || loginpass.value === '') {
        setLogin('Empty', 'username', 'password')
    }
    else {
        setLogin('Non_Empty', loginacc.value, loginpass.value)
    }
    loginacc.value=''
    loginpass.value=''
}

export default connect(
    (state) => {
        return {
            loginInfo: state.LoginReducer.loginInfo
        }
    },
    (dispatch) => {
        return {
            setLogin: (text, username, password) => dispatch(setLogin(text, username, password))
        }
    }
)(Login)
