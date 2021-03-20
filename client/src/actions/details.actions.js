import axios from 'axios';

// Action type
export const GET_COMPANY_DETAILS = 'GET_COMPANY_DETAILS';

// function to get the user info
export const getCompanyDetails = (uid)=>{
    return(dispatch)=>{  // "dispatch" c'est ce qu'on envoie au reducer
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/company/${uid}`) // note: ${uid} est dispo grace au "<UidContext.Provider/>" qui englobe notre "<Routes/>" component (voir App.js)
            .then((res) =>{
                dispatch({ // connexion au userReducer
                    type: GET_COMPANY_DETAILS, //on précise le type qu'on exporte en ligne4
                    payload: res.data // On envoie ici les datas recupérées dans la db avec axios au userReducer
                });
            })
            .catch((err)=> console.log(err));
    };
};