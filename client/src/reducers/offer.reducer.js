import {APPLY_OFFER, GET_OFFER} from '../actions/offer.action'

const initialState = {};

const offerReducer = ( state= initialState, action) =>{
    switch (action.type) {
        case GET_OFFER:
            return action.payload;
        
        case APPLY_OFFER://A corriger!!!!!!!!
            return state.map((offer)=>{
                if(offer._id === action.payload.offerId){
                    return {
                        ...offer,
                        applications:[action.payload.studentId, ...offer.applications]
                    }
                }
                return offer;
                });
               
        default:
            return state
    };  
};
export default offerReducer