import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { register } from './authactions'

//Store all of the registered information to the state in the reducer
const Register = ({accountname, dispname, email, phone, birth, zipcode,
    password, passconf, registerInfo, dispatch, location}) => {
    return(
        <div className='col-md-4' id="registerDiv">
            <h2>New User Register</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                const payload = {
                accountname: accountname.value,
                dispname: dispname.value,
                email: email.value,
                phone: phone.value,
                birth: birth.value,
                zipcode: zipcode.value,
                password: password.value,
                passconf: passconf.value,
                }
                dispatch(register(payload))
                }}>
                <div className="form-group">
                    <label>Account Name</label><br />
                    <input id="accountname" type="text" placeholder="qisuozhi" ref={(node) => accountname = node}
                    pattern="[a-zA-Z][a-zA-Z0-9]{1,20}" required />
                </div>
                <div className="form-group">
                    <label>Display Name</label><br />
                    <input id="dispname" type="text" placeholder="James" ref={(node) => dispname = node} />
                </div>
                <div className="form-group">
                    <label>Email Address</label><br />
                    <input id="emailaddress" type="email" placeholder="qisuozhi@gmail.com"
                    ref={(node) => email = node} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label><br />
                    <input id="phonenumber" type="tel" placeholder="812-606-4659" ref={(node) => phone = node}
                    pattern="\d{3}[\-]\d{3}[\-]\d{4}" required />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label><br />
                    <input id="birthinfo" type="date" ref={(node) => birth = node} required />
                </div>
                <div className="form-group">
                    <label>Zipcode</label><br />
                    <input id="zipcodeinfo" type="zipcode" placeholder="77005" ref={(node) => zipcode = node}
                    pattern="\d{5}" required />
                </div>
                <div className="form-group">
                    <label>Password</label><br />
                    <input id="pswordinfo" type="password" ref={(node) => password = node} required />
                </div>
                <div className="form-group">
                    <label>Password Confirmation</label><br />
                    <input id="passconfinfo" type="password" ref={(node) => passconf = node} required />
                </div>
                <div id="registerinfo" className="landingAlert">{registerInfo}</div>
                <div>
                    <input id="registerbutton" type="submit" className="btn btn-primary btn-lg" value="Register" />
                </div>
            </form>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            registerInfo: state.RegisterReducer.registerInfo
        }
    }, null
)(Register)
