import axios from 'axios';

// Action type
export const GET_OFFER = 'GET_OFFER';
export const APPLY_OFFER = 'APPLY_OFFER';

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