import axios from 'axios';

// Action type
export const GET_OFFER = 'GET_OFFER';
export const APPLY_OFFER = 'APPLY_OFFER';
export const LIKE_STUDENT = 'LIKE_STUDENT';
export const REJECT_STUDENT = 'REJECT_STUDENT';
export const CANCEL_APPLICATION = 'CANCEL_APPLICATION';
export const CLOSE_OFFER = 'CLOSE_OFFER';
export const OPEN_OFFER = 'OPEN_OFFER';



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

/**---------------------------------------------Action for company-----------------------------------------------------*/

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
};

export const likeStudent = (offerId, applicationId) =>{
    return(dispatch)=>{
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/offer/editApplicationStatus/${offerId}`,
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
                url:`${process.env.REACT_APP_API_URL}api/offer/editApplicationStatus/${offerId}`,
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

    export const closeOffer = (offerId) =>{
        return(dispatch)=>{
            return axios({
                method:"patch",
                url:`${process.env.REACT_APP_API_URL}api/offer/editOfferStatus/${offerId}`,
                data:{status: "closed"}
                })
                .then((res)=>{
                    dispatch({
                        type: CLOSE_OFFER,
                        // payload:{offerId}
                    })
                })
                .catch((err)=> console.log(err))
            }
    };

    export const openOffer = (offerId) =>{
        return(dispatch)=>{
            return axios({
                method:"patch",
                url:`${process.env.REACT_APP_API_URL}api/offer/editOfferStatus/${offerId}`,
                data:{status: "open"}
                })
                .then((res)=>{
                    dispatch({
                        type: OPEN_OFFER,
                        // payload:{offerId}
                    })
                })
                .catch((err)=> console.log(err))
            }
    };



/**---------------------------------------------Action for student-----------------------------------------------------*/


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

export const cancelApplication = (offerId, applicationId, studentId) =>{
    return(dispatch)=>{
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/offer/editApplicationStatus/${offerId}`,
            data:{applicationId :applicationId,
                  status: "cancelled by the student"}
            })
            .then((res)=>{
                dispatch({
                    type: CANCEL_APPLICATION,
                    payload:{applicationId}
                })
            })
            .catch((err)=> console.log(err))
    }
};
