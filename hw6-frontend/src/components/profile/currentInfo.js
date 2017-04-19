import React from 'react'
import { connect } from 'react-redux'

//The part that shows your current profile info
const CurrentInfo = ({dispname, email, phone, birth, zipcode}) => {
    return (
        <div className="col-md-3" id="currentInfoDisp">
            <h2>Current Info</h2>
            <p className="inforow"><b>Display Name</b>: {dispname}</p>
            <p id="curremailaddress" className="inforow"><b>Email</b>: {email}</p>
            <p className="inforow"><b>Phone</b>: {phone}</p>
            <p className="inforow"><b>Date of Birth</b>: {birth}</p>
            <p id="currzipcode" className="inforow"><b>Zipcode</b>: {zipcode}</p>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            dispname: state.RegisterReducer.dispname,
            email: state.RegisterReducer.email,
            phone: state.RegisterReducer.phone,
            birth: state.RegisterReducer.birth,
            zipcode: state.RegisterReducer.zipcode
        }
    }, null
)(CurrentInfo);
