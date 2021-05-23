import axios from 'axios'
import Toast from 'react-native-toast-message'

const authorActions = {

    createUser: (newUser) => {
        return async (dispatch, getState) => {
            const response = await axios.post('https://mytinerarysarmiento.herokuapp.com/api/user/signup', newUser)
            if (!response.data.success) {
                return response.data
            }
            dispatch({
                type: 'LOG_USER',
                payload: response.data.success ? response.data.response : null
            })
            Toast.show({
                type: 'success',
                text1: 'Welcome',
                visibilityTime: 3000,
                autoHide: true,
            })
            return response.data
        }
    },

    logInUser: (userToLogin) => {
        return async (dispatch, getState) => {
            const response = await axios.post('https://mytinerarysarmiento.herokuapp.com/api/user/signin', userToLogin)
            if (!response.data.success) {
                return response.data
            } else {
                dispatch({
                    type: 'LOG_USER',
                    payload: response.data.success ? response.data.response : null
                })
                Toast.show({
                    type: 'success',
                    text1: 'Welcome ' + response.data.response.firstName,
                    visibilityTime: 3000,
                    autoHide: true,
                })
                return response.data
            }
        }
    },

    signOut: () => {
        return (dispatch, getState) => {
            Toast.show({
                type: 'info',
                text1: 'Good bye',
                visibilityTime: 3000,
                autoHide: true,
            })
            dispatch({ type: 'SIGN_OUT' })
        }
    },

    forzedLogin: (userLoggedForzed) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://mytinerarysarmiento.herokuapp.com/api/user/signinLs', {
                    headers: {
                        'Authorization': 'Bearer ' + userLoggedForzed.token
                    }
                })
                dispatch({
                    type: 'LOG_USER', payload: {
                        ...response.data.response,
                        token: userLoggedForzed.token
                    }
                })
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error("what are you trying to do ???")
                    }
                }
            }
        }

    },

    userData: (user) => {
        return async (dispatch, getState) => {
            const response = await axios.put('https://mytinerarysarmiento.herokuapp.com/api/user/userdata', user)
            const token = response.data.token
            const newUser = { ...response.data.response, token }
            return newUser
        }
    },

    dataUpdate: (user) => {
        return (dispatch, getState) => {
            dispatch({ type: 'LOG_USER', payload: user })
        }
    }
}

export default authorActions