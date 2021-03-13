import { GET_COMPANY } from "../actions/company.action";


const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_COMPANY:   
            return action.payload; // on charge le (init)State avec les datas du user 
            
            
        default:
                return state;;
    }
}