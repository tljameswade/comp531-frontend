const defaultHeadline='Work hard!'

//The reducer to keep track of the status of the headline
const headlineReducer = (state = {
    headline: defaultHeadline
}
, action) => {
    switch (action.type) {
        case 'Update_Headline':
            return {
                ...state,
                headline: action.headline
            }
        case 'To_Landing':
            return {
                ...state,
                headline: ''
            }
        default:
            return state
    }
}

export default headlineReducer
