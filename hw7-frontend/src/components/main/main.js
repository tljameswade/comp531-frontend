import React from 'react'
import Navbar from './nav'
import Headline from './headline'
import Following from './following'
import Article from '../article/article'

//The main page component
const MainPage = () => {
    return(
        <div className="container">
            <h1>Welcome to the main page!</h1>
            <br />
            <br />
            <div className="row">
                <Navbar />
                <Headline />
            </div>
            <div className="row">
                <Following />
                <Article />
            </div>
        </div>
    )
}

export default MainPage
