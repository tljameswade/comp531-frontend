import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './comment'
import { updateCommStatus } from './articleactions'
import { addNewComment } from './articleactions'
import { updateCommfield } from './articleactions'
import { editArticle } from './articleactions'

//The component of individual article card
const ArticleView = ({editArticle, curruser, addNewComment, avatars, article_text, article_date, article_imgloc, article_comments, article_author, article_showcomm, article_id, updateCommStatus, updateCommfield}) => {
    const comments = {article_comments}
    const postDate = new Date(article_date)
    const postdate = postDate.getFullYear()+'-'+(postDate.getMonth()+1)+'-'+postDate.getDate()
    const posttime = postDate.getHours()+':'+postDate.getMinutes()
    let inputComment
    const ContentEditable = require('react-contenteditable')
    let editedArticle

    return(
        <div id="eachCard">
            <div>
                <span id="articleAuthor"><b>{article_author}</b></span>&nbsp;
                <span> posted on {postdate} at {posttime}</span>
            </div>
            <div>
                <ContentEditable
                    id="articleText"
                    html={article_text}
                    disabled={curruser != article_author}
                    onChange={ (e) => {editedArticle = e.target.value }}
                />
            </div>
            <div id="cardImg">
                {
                    !article_imgloc ? "":
                    <img className="img-rounded" id="articleImgs" src={article_imgloc} />
                }
            </div>
            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-success" onClick={ ()=> {
                    article_showcomm=!article_showcomm 
                    updateCommStatus(article_id, article_showcomm) }}>
                    {article_showcomm?"Hide Comments":"Show Comments" + " (" + article_comments.length + ")"}</button>
                {
                    curruser != article_author ? "" :
                    <button type="button" id="edittextbutton" className="btn btn-success" onClick={ () => editArticle(article_id, editedArticle) }>Edit Text</button>
                }                
            </div>
            <br />
            <div id='showcommbar'>
                {!article_showcomm?"":
                    <form className="form-inline">
                        <input type="text" id="commentbar" className="form-control" ref={(node) => inputComment = node} placeholder="Put your comment here..." />
                        <button type="button" className="btn btn-primary" onClick={() => {
                            addNewComment(article_id, inputComment.value)
                            inputComment.value=''}}>Submit Comment</button>
                    </form>
                }
            </div>
            <div>
                {
                    !article_showcomm?"":
                    article_comments.sort((a, b) => {
                        return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
                    }).map((comment) => (
                        <Comment key={comment.commentId} commId={comment.commentId} author={comment.author}
                        text={comment.text} date={comment.date} artId={article_id} />
                    ))
                }
            </div>
        </div>
    )
}


export default connect(
    (state) => {
        return {
            avatars: state.ArticleReducer.avatars,
            curruser: state.RegisterReducer.dispname
       }
    },
    (dispatch) => {
        return {
            updateCommStatus: (id, commStatus) => dispatch(updateCommStatus(id, commStatus)),
            addNewComment: (id, text) => dispatch(addNewComment(id, text)),
            editArticle: (id, text) => dispatch(editArticle(id, text))
        }
    }
)(ArticleView)


