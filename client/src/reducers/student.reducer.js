import { GET_STUDENT, UPLOAD_PICTURE_STUDENT } from "../actions/student.action";

const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_STUDENT:   
            return action.payload; // on charge le (init)State avec les datas du user 

        case UPLOAD_PICTURE_STUDENT:
            return { // return tjs un nouveau state !== modifier l'état existant
                ...state, // On récupère le state à l'aide du '...' spread operator
                picture: action.payload // On lui passe la nouvelle paire ('key:val') picture: chemin de la new pic
            };  
            
            
        default:
                return state;;
    }
}