
//The reducer to update information based on user's input of user information
const registerReducer = (state = {
}
, action) => {
    switch (action.type) {
        case 'Password_No_Match':
            return {
                ...state,
                registerInfo: action.registerInfo,
                updateInfo: action.updateInfo
            }
        case 'Correct_Register':
            return {...state,
                accountname: action.accountname,
                dispname: action.dispname,
                email: action.email,
                phone: action.phone,
                birth: action.birth,
                zipcode: action.zipcode,
                registerInfo: action.registerInfo
            }
        case 'Correct_Login':
            return {
                ...state,
                dispname: action.username
            }
        case 'Profile_Update': 
            return {
                ...state,
                email: action.email,
                zipcode: action.zipcode,
                birth: action.birth,
                avatar: action.avatar,
            }
        case 'Email_Update':
            return {
                ...state,
                email: action.email,
                updateInfo: action.updateInfo
            }
        case 'Zipcode_Update':
            return {
                ...state,
                zipcode: action.zipcode,
                updateInfo: action.updateInfo
            }
        case 'Update_Avatar':
            return {
                ...state,
                avatar: action.avatar
            }
        case 'Password_Update':
            return {
                ...state,
                updateInfo: action.updateInfo
            }
        case 'To_Landing':
            return {
                ...state,
                accountname: '',
                dispname: '',
                email: '',
                phone: '',
                birth: '',
                zipcode: '',
                registerInfo: '',
                avatar: '',
                updateInfo: '',
                linkInfo: ''
            }
        case 'Update_FBlink':
            return {
                ...state,
                linkInfo: action.linkInfo
            }
        case 'Unlink_FB':
            return {
                ...state,
                linkInfo: action.linkInfo
            }
        default:
            return state
    }
}

export default registerReducer
