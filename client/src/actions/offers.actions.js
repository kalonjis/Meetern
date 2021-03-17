import axios from 'axios';

// Action type
export const GET_ALL_OFFERS = 'GET_ALL_OFFERS';

// function to get the user info
export const getAllOffers = ()=>{
    return (dispatch)=>{
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/offer/`)
            .then ((res)=>{
                dispatch({
                    type: GET_ALL_OFFERS,
                    payload: res.data
                })
            })
            .catch ((err)=> console.log(err))
    };
};

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