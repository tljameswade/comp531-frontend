import React from 'react'
import Login from './login'
import Register from './register'

//The landing page
const Landing = () => {
    return (
        <div className='row'>           
            <h1>Welcome to my frontend draft!</h1>
            <br />
            <br />
            <Login />
            <div className='col-md-4'>
                <img src="https://i.redd.it/pnsveenc4ehy.gif" className="img-circle" id="ricePic" />
            </div>
            <Register />
        </div>
    )
}

export default Landing;
