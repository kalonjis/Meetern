import { GET_STUDENT } from "../actions/student.action";

const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_STUDENT:   
            return action.payload; // on charge le (init)State avec les datas du user 
            
            
        default:
                return state;;
    }
}