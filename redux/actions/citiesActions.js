import axios from 'axios'

const citiesActions = {
    getCities: () => {
        return (dispatch, getState) => {
            axios.get('https://mytinerarysarmiento.herokuapp.com/api/cities')
                .then(response => {
                    if (response.data.success) {
                        dispatch({ type: 'GET_CITIES', payload: response.data.cities, success: response.data.success })
                    }
                    else {
                        dispatch({ type: 'GET_CITIES', success: response.data.success })
                    }
                })
                .catch(error => dispatch({ type: 'GET_CITIES', success: false }))
        }
    },
    filterCities: (text) => {
        return (dispatch, getState) => {
            dispatch({ type: 'FILTER_CITIES', payload: text })
        }
    }
    
}
export default citiesActions