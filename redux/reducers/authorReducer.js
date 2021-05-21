import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    userLogged: null,
}

const authorReducer =  (state = initialState, action) => {

    switch (action.type) {
        case 'LOG_USER':
            if (action.payload) {
                AsyncStorage.setItem('token', action.payload.token)
                AsyncStorage.setItem('userLogged', JSON.stringify({
                    firstName: action.payload.firstName,
                    photoUrl: action.payload.photoUrl
                }))
            }
            return {
                ...state,
                userLogged: action.payload
            }

        case 'SIGN_OUT':
            AsyncStorage.clear()
            return {
                ...state,
                userLogged: null
            }

        default:
            return state
    }
}

export default authorReducer