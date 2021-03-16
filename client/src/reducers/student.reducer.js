import { GET_STUDENT, UPLOAD_PICTURE_STUDENT, UPDATE_STUDENT } from "../actions/student.action";

const initialState = {};

export default function studentReducer(state = initialState, action){
    switch (action.type) {
        case GET_STUDENT:   
            return action.payload; // on charge le (init)State avec les datas du user 

        case UPLOAD_PICTURE_STUDENT:
            return { // return tjs un nouveau state !== modifier l'état existant
                ...state, // On récupère le state à l'aide du '...' spread operator
                picture: action.payload // On luschooli passe la nouvelle paire ('key:val') picture: chemin de la new pic
            };  
        
        case UPDATE_STUDENT:
            return { 
                ...state, 
                bio: action.payload.bio,// On lui passe la nouvelle paire ('key:val') bio: nouveau contenu
                internshipStart: action.payload.internshipStart, 
                internshipDuration: action.payload.internshipDuration,
                school: action.payload.school,
                studyOption: action.payload.studyOption,
                currentStudyLevel: action.payload.currentStudyLevel,
                portfolio: action.payload.portfolio,
            }; 
            
        default:
                return state;
    }
}