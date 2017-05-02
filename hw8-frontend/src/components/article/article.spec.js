
import React, { Component, PropTypes } from 'react'
import {expect} from 'chai'
import fetch, { mock } from 'mock-fetch'
import {shallow} from 'enzyme'
import mockery from 'mockery'
import { url } from '../../actions'
import { Article } from './article'

describe('ArticlesView (component tests)', () => {

    let Reducer, addNewPost
    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                
            }
            Reducer = require('../../reducer').default
            addNewPost = require('../main/mainactions').addNewPost
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should render article', () => {
        const articles = [
            {_id: 1, author: 'sq6', comments: [], date: "2017-03-17"},
            {_id: 2, author: 'sep1', comments: [], date: "2017-03-18"}
        ]
  
        const node = shallow(
            <Article articles={articles} searchArticle={_ => _} updateSearch={_ => _} />
        )

        expect(node.children().length).to.eql(2)
    })

    // it('should dispatch actions to create a new article', (done) => {
    //     const oldState = {ArticleReducer:
    //         {
    //             nextArticleId: 9000000,
    //             articles: [
    //                 {_id: 1, author: 'sq6', comments: [], text: 'First article'},
    //                 {_id: 2, author: 'sep1', comments: [], text: 'Second article'}
    //             ],
    //             avatars:{},
    //             searchText: '',
    //             allArticles: {}
    //         }
    //     }

    //     const fd = new FormData()
    //     const newArticle = 'A new article'
    //     const newAuthor = 'Random'
    //     fd.append('text', newArticle)

    //     mock(`${url}/article`, {
    //         method: 'POST',
    //         headers: {'Content-Type':'text/plain'},
    //         credentials: 'include'
    //     })

    //     addNewPost(newAuthor, newArticle, undefined)(
    //         action => {
    //             console.log(action)
    //             expect(action).eql({ type: 'Add_New_Article', newArticle: newArticle })
    //             const newState = Reducer(oldState, action)
    //             console.log(newState)
    //             expect(newState.ArticleReducer.articles.length).to.be.eql(3)
    //             expect(newState.ArticleReducer.articles[2].author).to.be.eql(newAuthor)
    //             expect(newState.ArticleReducer.articles[2].text).to.be.eql(newArticle)
    //             done()
    //         }            
    //     )
    // })
})