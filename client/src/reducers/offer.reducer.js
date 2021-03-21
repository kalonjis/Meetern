import { GET_OFFER} from '../actions/offer.action'

const initialState = {};

const offerReducer = ( state= initialState, action) =>{
    switch (action.type) {
        case GET_OFFER:
            return action.payload;
        
        
        default:
            return state
    };  
};
export default offerReducer