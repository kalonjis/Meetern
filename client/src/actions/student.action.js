import axios from 'axios';

// Action type
export const GET_STUDENT = 'GET_STUDENT';

// function to get the user info
export const getStudent = (uid)=>{
    return(dispatch)=>{  // "dispatch" c'est ce qu'on envoie au reducer
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/student/${uid}`) // note: ${uid} est dispo grace au "<UidContext.Provider/>" qui englobe notre "<Routes/>" component (voir App.js)
            .then((res) =>{
                dispatch({ // connexion au userReducer
                    type: GET_STUDENT, //on précise le type qu'on exporte en ligne4
                    payload: res.data // On envoie ici les datas recupérées dans la db avec axios au userReducer
                });
            })
            .catch((err)=> console.log(err));
    };
};
