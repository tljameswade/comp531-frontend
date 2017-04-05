import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { url } from '../../actions'


describe('Validate Article Actions', () => {

let searchArticle, getArticles, resource

    beforeEach(() => {
        if (mockery.enable) {
            
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').resource
            searchArticle = require('./articleactions').searchArticle
            getArticles = require('./articleactions').getArticles
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })


    it('should fetch articles (mocked request)', (done)=>{

        const getState = {articles: {avatars: {}}}
        mock(`${url}/articles`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { articles: [{_id: 1, author: 'Scott', comments: [] }]}
        })

        getArticles()(
            action =>{
              expect(action).to.satisfy((action)=>{
                    return action.type=='Update_Articles' && action.realarticles[0].author == 'Scott'
                })
                done()
            }
            ,
            ()=>{return getState}               
            
        )
    })


    it('should update the search keyword', ()=>{
        const searchText = 'searchText'
        expect(searchArticle(searchText)).to.eql({ type: 'Search_Text', searchText })
    })

})