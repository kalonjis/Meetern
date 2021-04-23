import { CLOSE_OFFER, GET_OFFER, LIKE_STUDENT, OPEN_OFFER, REJECT_STUDENT} from '../actions/offer.action'

const initialState = {};

const offerReducer = ( state= initialState, action) =>{
    switch (action.type) {
        case GET_OFFER:
            return action.payload;
        
        case LIKE_STUDENT:
            return {...state,
                    applications : state.applications.map((application)=>{
                            if (application._id === action.payload.applicationId){
                                return {
                                    ...application,
                                    status: "liked"
                                }
                            }else return application
                        })
            };
        
        case REJECT_STUDENT:
            return {...state,
                    applications : state.applications.map((application)=>{
                            if (application._id === action.payload.applicationId){
                                return {
                                    ...application,
                                    status: "rejected"
                                }
                            }else return application
                        })
            };
                    
        case CLOSE_OFFER:
            return {...state,
                    status : "closed"
            };
            
        case OPEN_OFFER:
            return {...state,
                    status : "open"
            };
                
        default:
            return state;
    };  
};
export default offerReducer