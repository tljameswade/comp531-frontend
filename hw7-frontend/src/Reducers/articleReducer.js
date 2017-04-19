
//The article reducer to keep track of articles being shown
const initialState = {
    articles: [],
    avatars:{},
    searchText: '',
    allArticles: []
}
const articleReducer = (state = initialState, action) => {
    let thisdate = new Date()

    switch (action.type) {
        case 'To_Landing':
            return initialState
        case 'Update_Articles':
            return {
                ...state,
                articles: action.realarticles,
                allArticles: action.realarticles
            }
        case 'Filter_Article':
            return {
                ...state,
                searchText: action.searchText,
                articles: action.articles
            }

        case 'Update_Avatars':
            return {
                ...state,
                avatars: action.avatars
            }
        case 'Add_New_Article':
            return {
                ...state,
                articles: [
                    ...state.articles,
                    action.newArticle
                ],
                allArticles: [
                    ...state.allArticles,
                    action.newArticle
                ]
            }

        case 'Search_Text':
            return {
                ...state,               
                searchText: action.searchText
            }

        case 'Show_comments':
            return {
                ...state,
                articles: state.articles.map(commArticle => {
                    if (commArticle._id == action.commId) {
                        return {
                            ...commArticle, article_showcomm : action.commStatus
                        }                        
                    }
                    else {
                        return commArticle
                    }
                })
            }

        case 'Edit_Article':
            return {
                ...state,
                articles: state.articles.map(article => {
                    if (article._id == action.article._id) {
                        return {
                            ...article, comments: action.article.comments
                        }
                    }
                    else {
                        return article
                    }               
                }),
                allArticles: state.allArticles.map(article => {
                    if (article._id == action.article._id) {
                        return {
                            ...article, comments: action.article.comments
                        }
                    }
                    else {
                        return article
                    }                      
                })
            }
    }
    return state
}

export default articleReducer
