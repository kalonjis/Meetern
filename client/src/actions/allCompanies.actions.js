import axios from 'axios';

// Action type
export const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES';

// function to get the all Companies datas
export const getAllCompanies = ()=>{
    return (dispatch)=>{
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/company/`)
            .then ((res)=>{
                dispatch({
                    type: GET_ALL_COMPANIES,
                    payload: res.data
                })
            })
            .catch ((err)=> console.log(err))
    };
};
