import { combineReducers } from 'redux'
import FollowReducer from './Reducers/followReducer'
import RegisterReducer from './Reducers/registerReducer'
import LoginReducer from './Reducers/loginReducer'
import LocationReducer from './Reducers/locationReducer'
import headlineReducer from './Reducers/headlineReducer'
import ArticleReducer from './Reducers/articleReducer'

//The overall reducer that combines all of the sub-reducers
const Reducer = combineReducers({
    FollowReducer,
    RegisterReducer,
    LoginReducer,
    LocationReducer,
    headlineReducer,
    ArticleReducer
})


export default Reducer
