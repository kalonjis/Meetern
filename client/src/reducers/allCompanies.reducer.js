import { GET_ALL_COMPANIES } from "../actions/allCompanies.actions"

const initialState = {}

export default function allCompaniesReducer (state = initialState, action){
    switch (action.type) {
        case GET_ALL_COMPANIES:
            return action.payload
    
        default:
            return state
    }
}