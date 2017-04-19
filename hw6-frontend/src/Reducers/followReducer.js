
//The follow reducer to keep track of the people that the user is following
const followReducer = (state = {
    followers: {},
    error:''
}
, action) => {
    switch (action.type) {
        case 'Error_Follow':
            return {
                ...state,
                error: action.error
            }
        case 'Update_Followers':
            return {
                ...state,
                followers: action.followers
            }
        case 'To_Landing':
            return {
                ...state,
                followers: {},
                error: ''
            }

        default:
            return state
    }
}

export default followReducer
