import { GET_COMPANY, UPDATE_COMPANY, UPLOAD_PICTURE_COMPANY } from "../actions/company.action";


const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_COMPANY:   
            return action.payload; // on charge le (init)State avec les datas du user 

        case UPLOAD_PICTURE_COMPANY:
            return { // return tjs un nouveau state !== modifier l'état existant
                ...state, // On récupère le state à l'aide du '...' spread operator
                picture: action.payload // On lui passe la nouvelle paire ('key:val') picture: chemin de la new pic
            };
        case UPDATE_COMPANY:
            return { 
                ...state, 
                bio: action.payload.bio,// On lui passe la nouvelle paire ('key:val') bio: nouveau contenu
                sector: action.payload.sector, 
                companyType: action.payload.companyType,
                phone: action.payload.phone,
                webSite: action.payload.webSite,
                corporateWear: action.payload.corporateWear,
            }; 
            
        default:
                return state;
    }
}