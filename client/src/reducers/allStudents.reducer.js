import { GET_ALL_STUDENTS } from "../actions/allStudents.actions"

const initialState = {}

export default function allStudentsReducer (state = initialState, action){
    switch (action.type) {
        case GET_ALL_STUDENTS:
            return action.payload
    
        default:
            return state
    }
}