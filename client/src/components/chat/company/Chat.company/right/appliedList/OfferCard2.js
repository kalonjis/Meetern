import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { rejectStudent, selectStudent } from '../../../../../../actions/offer.action';
import ApplicationCard from '../../../../../offers/ApplicationCard';
import { isEmpty, timestampParser } from '../../../../../utils';


const OfferCard2 = ({applicationId}) => {
    const offer = useSelector( state => state.offerReducer)
    const allStudents = useSelector( state => state.allStudentsReducer)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if( !isEmpty(offer) && allStudents[0]){
            setIsLoading(false)
        }
    }, [offer, allStudents, applicationId])

    const handleSelect = async(offerId, applicationId) =>{
        await dispatch( selectStudent(offerId, applicationId))
        console.log("application selected")

    }
    const handleReject = async(offerId, applicationId)=>{
        await dispatch(rejectStudent(offerId, applicationId))

    }
    
    return (
        <div className= "offerCard-container">
            { isLoading && (
                <i className="fas fa-spinner fa-spin"></i>
                )
            }
            {  isLoading === false &&(
                <>  
                    <div className="application-container">
                        { offer.status === "closed" ? (
                                <div> 
                                    { offer.applications.map( application => {
                                            if (application._id === applicationId){
                                                return <ApplicationCard key={application._id} application={application}/>
                                            } else return null
                                        })   
                                    } 
                                </div>
                            ) : (
                                <div>
                                    {offer.applications.map( application => {
                                            if (application._id === applicationId){
                                                return(
                                                    <div key={application._id}>
                                                    <ApplicationCard application={application}/>
                                                    { application.status === "rejected" || application.status === "liked" ? (
                                                            <button onClick={e=> handleSelect(offer._id, application._id)}>Select</button>
                                                        ): (
                                                            <button onClick={e=> handleReject(offer._id, application._id)}>Reject</button>
                                                        )
                                                    } 
                                                </div>
                                                )
                                            } else return null
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                    <h1>{offer.position} <span className="offerCard-offer-status">{offer.status}</span>
                    </h1>
                    <div className="offerCard-details">
                        <p>Description :  {offer.description} </p>
                        <p>Hiring possibility :  {offer.hiringPossibility} </p>
                        <p>Starting date :  {offer.internshipStart} </p>
                        <p> Duration :  {offer.internshipDuration} </p>
                        <p>Place :  {offer.internshipPlace} </p>
                        <p>Face to face : {offer.faceToface} </p>
                        <p> Online since : { timestampParser(offer.createdAt)}</p>
                        <ul> Selected student : 
                            {   offer.applications.map( application => {
                                    if (application.status === "selected"){
                                        return (
                                            <li key={application._id}>
                                                {   
                                                    allStudents.filter( student => student._id === application.studentId)[0].firstname + " " +
                                                    allStudents.filter( student => student._id === application.studentId)[0].lastname
                                                }
                                            </li>
                                        )
                                    } else return null
                                }) 
                            }
                        </ul>
                    </div>
                </>
                )
            }
        </div>
    )
}

export default OfferCard2
