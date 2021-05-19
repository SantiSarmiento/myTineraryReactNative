const initialState = {
    cities: [],
    copyCities: []
}

const cityReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_CITIES':
            if (action.success) {
                return {
                    ...state,
                    cities: action.payload,
                    copyCities: [...action.payload],
                    success: action.success
                }
            }else{
                return{
                    ...state,
                    success: action.success
                }
            }

        case 'FILTER_CITIES':
            return {
                ...state,
                cities: state.copyCities.filter(city => city.name.trim().toLowerCase().indexOf(action.payload.trim().toLowerCase()) === 0)
            }

        default:
            return state
    }
}

export default cityReducer