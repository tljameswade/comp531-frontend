import React from 'react'
import { connect } from 'react-redux'
import { addNewPost } from './mainactions'

//The headline component to post a new article
const Headline = ({ addNewPost, author }) => {
    let inputArticle;
    let inputImg;

    const uploadImg = (e) => {
        e.preventDefault()

        inputImg = e.target.files[0]
    }

    return(
        <div className="col-md-6 col-sm-12" id="headlinePart">
            <div id="addImg" className="col-md-4 col-sm-5">
                <br />
                <div>Add</div>
                <div>Image</div>
            </div>
            <div className="col-md-6 col-sm-5">
                <textarea id="newarticletext" rows="10" cols="48" placeholder="Please write your new post here"
                ref={(node) => inputArticle = node}>
                </textarea>
            </div>
            <div className="col-md-4 col-sm-4">
                <input type="file" value="Add your image" onChange={ (e) => uploadImg(e) } />
            </div>
            <div className="col-md-6 col-sm-6" className="postButtons">
                <div className="btn-group" role="group" className="postButtons">
                    <input className="btn btn-success" type="button" value="Cancel" onClick={ ()=>{
                        inputArticle.value=''
                        inputImg = undefined} }/>
                    <input id="articlesubmit" className="btn btn-success" type="button" value="Post" onClick={ ()=>{
                        addNewPost(author, inputArticle.value, inputImg)
                        inputArticle.value=''
                        inputImg = undefined}}/>
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            author: state.RegisterReducer.dispname
        }
    },
    (dispatch) => {
        return {
            addNewPost: (author, text, image) => dispatch(addNewPost(author, text, image))
        }
    }
)(Headline)
