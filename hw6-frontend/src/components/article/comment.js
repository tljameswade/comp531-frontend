import React from 'react'
import { connect } from 'react-redux'
import { editComment } from './articleactions'

//The comments component
const Comment = ({editComment, curruser, commId, author, text, date, avatars, artId}) => {
    const commDate = new Date(date)
    const commdate = commDate.getFullYear()+'-'+(commDate.getMonth()+1)+'-'+commDate.getDate()
    const commtime = commDate.getHours()+':'+commDate.getMinutes()
    const avatarUrl = avatars[author]
    const ContentEditable = require('react-contenteditable')

    let editedComment

    return(
        <ul className="collection">
            <li className="collection-item">
                <div><img id="commentImg" className="img-rounded" src={avatarUrl} />&nbsp;<b>{author}</b> commented on {commdate} at {commtime}</div>
                <div className="row">
                    <ContentEditable
                        className="col-md-9"
                        html={text}
                        disabled={curruser != author}
                        onChange={ (e) => {editedComment = e.target.value }}
                    />
                    {
                        curruser!=author ? "":
                        <button className="btn btn-primary btn-xs" onClick={ () => editComment(commId, artId, editedComment) }>Edit Comment</button>
                    }
                </div>
            </li>   
        </ul>
    )
}

export default connect(
    (state) => {
        return {
            avatars: state.ArticleReducer.avatars,
            curruser: state.RegisterReducer.dispname
        }
    },
    (dispatch) => {
        return {
            editComment: (commId, artId, editedComment) => dispatch(editComment(commId, artId, editedComment))
        }
    }
)(Comment)
