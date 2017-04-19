const defaultHeadline='Work hard!'

//The reducer to keep track of the status of the headline
const headlineReducer = (state = {
    username: 'guest',
    headline: defaultHeadline
}
, action) => {
    switch (action.type) {
        case 'Update_Headline':
            return {
                ...state,
                username: action.username,
                headline: action.headline
            }
        case 'To_Landing':
            return {
                ...state,
                username: '',
                headline: ''
            }
        default:
            return state
    }
}

export default headlineReducer
