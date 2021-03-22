import axios from 'axios';

// Action type
export const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';

// function to get the all students datas
export const getAllStudents = ()=>{
    return (dispatch)=>{
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/student/`)
            .then ((res)=>{
                dispatch({
                    type: GET_ALL_STUDENTS,
                    payload: res.data
                })
            })
            .catch ((err)=> console.log(err))
    };
};
