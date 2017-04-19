
//The location reducer to keep track of the location of the page,
//which is import in a single page application
const locationReducer = (state = {}
, action) => {
    switch (action.type) {
        case 'Correct_Register':
            return {
                ...state,
                location: action.location
            }
        case 'To_Profile':
            return {
                ...state,
                location: 'profile'
            }
        case 'To_Landing':
            return {
                ...state,
                location: 'landing'
            }
        case 'To_Main':
            return {
                ...state,
                location: 'main'
            }
        default:
            return state
    }
}

export default locationReducer
