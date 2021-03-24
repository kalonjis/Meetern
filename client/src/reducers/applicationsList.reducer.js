import { GET_STUDENT_APPLICATIONS } from '../actions/applicationsList.action';

const initialState = {};

export default function applicationsListReducer ( state= initialState, action ){
    switch (action.type) {
        case GET_STUDENT_APPLICATIONS:
            return action.payload;
               
        default:
            return state;
    }

}