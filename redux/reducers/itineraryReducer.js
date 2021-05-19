const initialState = {
    itineraries: [],
    copyItineraries: []
}

const itineraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ITINERARIES':
            return {
                ...state,
                itineraries: action.payload,
                copyItineraries: action.payload
            }

        case 'UPDATE_COMMENT':
            return {
                ...state,
                itineraries: state.itineraries.map(itinerary => {
                    if(itinerary._id === action.payload._id){
                        itinerary = action.payload
                    }
                    return itinerary
                })
            }

        default:
            return state
    }
}

export default itineraryReducer