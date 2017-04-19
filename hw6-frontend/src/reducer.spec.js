import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import Reducer from './reducer'
import { searchArticle } from './components/article/articleactions'
import { updateSearch } from './components/article/articleactions'

let initialState = {
    ArticleReducer: {
        articles: [],
        avatars: {},
        searchText: '',
        allArticles: []
    },
    FollowReducer: {
        error: '',
        followers: {}
    },
    LocationReducer: {},
    LoginReducer: {},
    RegisterReducer: {},
    headlineReducer: {
        headline: "Work hard!",
        username: "guest"
    }
}

describe('Validate reducer (no fetch requests here)', ()=> {
	it('should return the initial state', ()=>{
        expect(Reducer(undefined, {})).to.eql(initialState)
    })

 	it('should state success (for displaying success message to user)', ()=>{
        const registerInfo = 'You have successfully registered!'
        expect(Reducer(undefined, {
            type: 'Correct_Register',
            accountname: 'somename',
            birth: '07-10-1990',
            dispname: 'somedisp',
            email: 'someemail@some.come',
            phone: '123-123-1234',
            zipcode: '12345', 
            registerInfo: registerInfo,
            location: 'landing'
        }))
        .to.eql({
            ...initialState, 
            RegisterReducer: {
                ...initialState.RegisterReducer, 
                accountname: 'somename',
                birth: '07-10-1990',
                dispname: 'somedisp',
                email: 'someemail@some.come',
                phone: '123-123-1234',
                zipcode: '12345', 
                registerInfo: registerInfo
            },
            LocationReducer: {...initialState.LocationReducer, location: 'landing'}
        })
    })

 	it('should state error (for displaying error message to user)', ()=>{
        const error = "You failed to login!"
        expect(Reducer(undefined, { type:'Fail_Login', loginInfo: error }))
        .to.eql({
            ...initialState, 
            LoginReducer: { ...initialState.LoginReducer, loginInfo: error }
        })
    })
        
 	it('should set the articles',()=> {
        const samplearticles = {0: {_id:0, author:'sq6', text:'Sample text'}}
		expect(Reducer(undefined, {
            type: 'Update_Articles',
            realarticles: samplearticles
        }))
		.to.eql({
            ...initialState,
            ArticleReducer: {
                ...initialState.ArticleReducer,
                articles: samplearticles,
                allArticles: samplearticles
            }
        })
	})

    it('should set the search keyword', ()=>{
        const searchText = "search something"
        expect(Reducer(undefined, { type: 'Search_Text' , searchText })).to.eql({
            ...initialState, 
            ArticleReducer: { ...initialState.ArticleReducer, searchText: searchText }
        })
    })

    it('should filter displayed articles by the search keyword', ()=>{
         const searchText = 'sample'
         const samplearticles = {
             0: {_id: 1, text: "hello sample", author: "sq6"},
             1: {_id: 2, text: "hello something", author: "sep1"},
             2: {_id: 3, text: "hello somebody", author: "yp15"}
         }
         const filteredarticles = {
             0: {_id: 1, text: "hello sample", author: "sq6"}
         }
         const beforeSearch = {
             ArticleReducer: {
                 articles: samplearticles,
                 avatars: {},
                 nextArticleId: 9000000,
                 searchText: '',
                 allArticles: samplearticles
             },
             FollowReducer: {
                 error: '',
                 followers: {}
             },
             LocationReducer: {},
             LoginReducer: {},
             RegisterReducer: {},
             headlineReducer: {
                 headline: "Work hard!",
                 username: "guest"
             }
        }
        expect(Reducer(beforeSearch, { type: 'Filter_Article', searchText: searchText, articles: filteredarticles })).to.eql(
            {
                ...beforeSearch,
                ArticleReducer: {
                    ...beforeSearch.ArticleReducer,
                    articles: filteredarticles,
                    avatars: {},
                    searchText: searchText
                }
            }
        )
    })
	
})