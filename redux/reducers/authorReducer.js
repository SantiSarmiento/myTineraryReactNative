const initialState = {
    userLogged: null,
}

const authorReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOG_USER':
            if (action.payload) {
                localStorage.setItem('userLogged', JSON.stringify({
                    firstName: action.payload.firstName,
                    photoUrl: action.payload.photoUrl
                }))
                localStorage.setItem('token', action.payload.token)
            }
            return {
                ...state,
                userLogged: action.payload
            }

        case 'SIGN_OUT':
            localStorage.clear()
            return {
                ...state,
                userLogged: null
            }

        default:
            return state
    }
}

export default authorReducer