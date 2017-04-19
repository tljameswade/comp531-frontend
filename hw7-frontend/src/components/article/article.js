import React from 'react'
import { connect } from 'react-redux'
import ArticleView from './articlesView'
import { searchArticle } from './articleactions'
import { updateSearch } from './articleactions'

//The article component to show all the articles and images
export const Article = ({articles, searchArticle, updateSearch}) => {
    let inputSearch

    return(
        <div className="col-md-7" id='article'>
            <div className="input-group">
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" aria-label="Left Align">
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </span>
                <input id="searchbar" type="text" className="form-control" placeholder="Search here..."
                ref={(node) => inputSearch = node} onChange={() => {
                    searchArticle(inputSearch.value)
                    updateSearch(inputSearch.value)}}/>
            </div>
            <div>
                {
                    Object.keys(articles).map(id => articles[id]).sort((a, b) => {
                        return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
                    }).map((article) => (
                        <ArticleView key={article._id} article_id={article._id} article_text={article.text} article_date={article.date}
                        article_imgloc={article.img} article_author={article.author} article_comments={article.comments}
                        article_showcomm={article.article_showcomm} article_commfield={article.article_commfield}
                        />
                    ))
                }
            </div>
        </div>
    )
}


export default connect(
    (state) => {
        return {
            articles: state.ArticleReducer.articles
        }
    },
    (dispatch) => {
        return {
            searchArticle: (searchText) => dispatch(searchArticle(searchText)),
            updateSearch: (searchText) => dispatch(updateSearch(searchText))
        }
    }
)(Article)
