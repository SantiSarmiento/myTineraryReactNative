import { combineReducers } from 'redux'
import cityReducer from './cityReducer'
import itineraryReducer from './itineraryReducer'
import authorReducer from './authorReducer'

const mainReducer = combineReducers({
    cities: cityReducer,
    itineraries: itineraryReducer,
    authorReducer,
})

export default mainReducer