import axios from 'axios'

const itinerariesActions = {

    getItineraries: (id) => {
        return (dispatch, getState) => {
            axios.get('https://mytinerarysarmiento.herokuapp.com/api/itineraries/' + id)
                .then(response => {
                    if (response.data.success) {
                        dispatch({ type: 'GET_ITINERARIES', payload: response.data.response, success: response.data.success })
                    }
                    else {
                        dispatch({ type: 'GET_ITINERARIES', success: response.data.response })
                    }
                })
                .catch(error => dispatch({ type: 'GET_ITINERARIES', success: false }))
        }
    },

    sendComment: (data) => {
        return async (dispatch, getState) => {
            const response = await axios.put('https://mytinerarysarmiento.herokuapp.com/api/itinerary/' + data.id, data, {
                headers: {
                    'Authorization': 'Bearer ' + data.token
                }
            })
            if (response) {
                dispatch({ type: 'UPDATE_COMMENT', payload: response.data.response })
                return response.data.success
            }

        }
    },

    deleteComment: (data) => {
        return async (dispatch, getState) => {
            const response = await axios.put('https://mytinerarysarmiento.herokuapp.com/api/itinerary/comments/' + data.itineraryId, data, {
                headers: {
                    'Authorization': 'Bearer ' + data.token
                }
            })
            if (response) {
                dispatch({ type: 'UPDATE_COMMENT', payload: response.data.response })
            }
        }
    },

    editMessage: (data) => {
        return async (dispatch, getState) => {
            const response = await axios.put('https://mytinerarysarmiento.herokuapp.com/api/itinerary/comment/' + data.commentId, data, {
                headers: {
                    'Authorization': 'Bearer ' + data.token
                }
            })
            if (response) {
                dispatch({ type: 'UPDATE_COMMENT', payload: response.data.response })
            }
        }
    },

    putLike: (data) => {
        return async (dispatch, getState) => {

            const response = await axios.put('https://mytinerarysarmiento.herokuapp.com/api/itinerary/like/' + data.itineraryId, data)
            if (response) {
                dispatch({ type: 'UPDATE_COMMENT', payload: response.data.response })
                return response
            }
        }
    },

    deleteLike: (data) => {
        return async (dispatch, getState) => {

            const response = await axios.put('https://mytinerarysarmiento.herokuapp.com/api/itinerary/deleteLike/' + data.itineraryId, data)
            if (response) {
                dispatch({ type: 'UPDATE_COMMENT', payload: response.data.response })
                return response
            }
        }
    }


}

export default itinerariesActions