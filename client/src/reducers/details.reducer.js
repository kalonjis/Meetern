import { GET_COMPANY_DETAILS, GET_STUDENT_DETAILS} from "../actions/details.actions"

const initialState = {};

export default function detailsReducer(state = initialState, action){
    switch (action.type) {
        case GET_COMPANY_DETAILS:   
            return action.payload;

        case GET_STUDENT_DETAILS:   
            return action.payload; 
        default:
                return state;
    }
}