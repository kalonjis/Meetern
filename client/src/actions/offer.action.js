import axios from 'axios';

// Action type
export const GET_OFFER = 'GET_OFFER';
export const APPLY_OFFER = 'APPLY_OFFER';
export const LIKE_STUDENT = 'LIKE_STUDENT';
export const REJECT_STUDENT = 'REJECT_STUDENT';
export const CANCEL_APPLICATION = 'CANCEL_APPLICATION';

// function to create a new offer
export const addOffer = (id, 
    position,
    description,
    hiringPossibility,
    internshipStart,
    internshipDuration,
    internshipPlace,
    faceToface )=>{
    return (dispatch)=>{
        return axios({
            method:"post",
            url:`${process.env.REACT_APP_API_URL}api/offer/`,
            data:{companyId: id, 
                position: position,
                description: description,
                hiringPossibility: hiringPossibility,
                internshipStart: internshipStart,
                internshipDuration: internshipDuration,
                internshipPlace: internshipPlace,
                faceToface: faceToface, 
                }
        })
    }
}

// function to get all datas of an offer
export const getOffer = (offerId) =>{
    return(dispatch)=>{
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/offer/${offerId}`)
            .then((res)=>{
                dispatch({
                    type: GET_OFFER,
                    payload: res.data
                })
            })
            .catch((err)=> console.log(err))
    };
};

export const applyNow =(offerId, studentId) =>{
    return(dispatch)=>{
        return axios
            .patch(`${process.env.REACT_APP_API_URL}api/offer/apply/${offerId}`,{studentId})
            .then((res)=>{
                dispatch({
                    type: APPLY_OFFER,
                    payload: {offerId, studentId}
                })
            })
            .catch((err)=> console.log(err))
    }
}

export const likeStudent = (offerId, applicationId) =>{
    return(dispatch)=>{
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/offer/editStatus/${offerId}`,
            data:{applicationId :applicationId,
                  status: "liked"}
            })
            .then((res)=>{
                dispatch({
                    type: LIKE_STUDENT,
                    payload:{applicationId}
                })
            })
            .catch((err)=> console.log(err))
    }
};

export const rejectStudent = (offerId, applicationId) =>{
    return(dispatch)=>{
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/offer/editStatus/${offerId}`,
            data:{applicationId :applicationId,
                  status: "rejected"}
            })
            .then((res)=>{
                dispatch({
                    type: REJECT_STUDENT,
                    payload:{applicationId}
                })
            })
            .catch((err)=> console.log(err))
    }
};

export const cancelApplication = (offerId, applicationId, studentId) =>{
    return(dispatch)=>{
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/offer//cancelapplication/${offerId}`,
            data:{applicationId :applicationId,
                  studentId: studentId}
            })
            .then((res)=>{
                dispatch({
                    type: CANCEL_APPLICATION,
                    payload:{applicationId, studentId}
                })
            })
            .catch((err)=> console.log(err))
    }
};
