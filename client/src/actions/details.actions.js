import axios from 'axios';

// Action type
export const GET_COMPANY_DETAILS = 'GET_COMPANY_DETAILS';

// function to get the company info
export const getCompanyDetails = (id)=>{
    return(dispatch)=>{  // "dispatch" c'est ce qu'on envoie au reducer
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/company/${id}`)
            .then((res) =>{
                dispatch({ 
                    type: GET_COMPANY_DETAILS, 
                    payload: res.data 
                });
            })
            .catch((err)=> console.log(err));
    };
};

export const GET_STUDENT_DETAILS = 'GET_STUDENT_DETAILS';

// function to get the student info
export const getStudentDetails = (id)=>{
    return(dispatch)=>{  
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/student/${id}`)
            .then((res) =>{
                dispatch({ 
                    type: GET_STUDENT_DETAILS, 
                    payload: res.data 
                });
            })
            .catch((err)=> console.log(err));
    };
};