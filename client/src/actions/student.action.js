import axios from 'axios';

// Action type
export const GET_STUDENT = 'GET_STUDENT';
export const UPLOAD_PICTURE_STUDENT = 'UPLOAD_PICTURE_STUDENT';
export const GET_STUDENT_ERRORS = 'GET_STUDENT_ERRORS'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'

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

// function to upload a new pic for the user's profile
export const uploadPictureStudent = (data, id)=> {
    return (dispatch)=>{ //traitement pour envoi au reducer:

        return axios
         .post(`${process.env.REACT_APP_API_URL}api/student/upload`, data) //1) on envoie la new data à la db
         .then((res)=>{
            if(res.data.errors){
                dispatch({
                    type: GET_STUDENT_ERRORS,
                    payload : res.data.errors
                })
            } else { 
             res.data.errors=''
             return axios
              .get(`${process.env.REACT_APP_API_URL}api/student/${id}`) // 2) On va recupérer les datas du user dans la db
              .then((res) =>{
                    dispatch({ //3) on envoie au reducer...
                        type: UPLOAD_PICTURE_STUDENT, 
                        payload: res.data.picture // ...le chemin de l'image
                    })
               })
            }
        })
        .catch((err)=> console.log(err));
    }
}

// function to update user's bio
export const updateStudent = (studentId, bio, internshipStart, internshipDuration, school, studyOption, currentStudyLevel, portfolio)=> {
    return (dispatch)=>{
        return axios
         .put(`${process.env.REACT_APP_API_URL}api/student/${studentId}`, {bio, internshipStart, internshipDuration, school, studyOption, currentStudyLevel, portfolio}) //1) on envoie la new data à la db
         .then((res)=>{
            dispatch({ //2) on envoie au reducer...
                    type: UPDATE_STUDENT, 
                    payload: {bio, internshipStart, internshipDuration, school, studyOption, currentStudyLevel, portfolio}
            }) 
         })
         .catch((err)=> console.log(err));
    }
}
