import { GET_ALL_OFFERS } from "../actions/offers.actions";


const initialState = {};

const allOffersReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_ALL_OFFERS:
            return action.payload;
    
        default:
            return state
    };
};
export default allOffersReducer;