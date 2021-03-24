import axios from 'axios';

// Action type
export const GET_STUDENT_APPLICATIONS = 'GET_STUDENT_APPLICATIONS';

// function to get the allOffers datas
export const getStudentApplicationsList = (studentId)=>{
    return (dispatch)=>{
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/offer/`)
            .then ((res)=>{
                let appList =[];
                (res.data).map((offer)=>{
                    return(
                        offer.applications.map((application)=>{
                            if(application.studentId === studentId){
                                return appList.push(application._id)
                            } else{
                                return null
                            }
                        })
                    )
                })

                dispatch({
                    type: GET_STUDENT_APPLICATIONS,
                    payload: appList
                })
            })
            .catch ((err)=> console.log(err))
    };
};