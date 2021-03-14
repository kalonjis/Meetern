import { GET_COMPANY_ERRORS } from "../actions/company.action";


const initialState = {companyErrors: [], studentErrors:[]};

const errorReducer = ( state=initialState, action) =>{
    switch (action.type) {
        case GET_COMPANY_ERRORS :
           return {
               companyErrors: action.payload,
               studentErrors :[]
           } 
        // case GET_USER_ERRORS : 
        //     return {
        //         userErrors :action.payload,
        //         postErrors:[]
        //     }   
    
        default:
           return state
    }


}
export default errorReducer