import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOffers } from '../../../actions/allOffers.actions';
import { getStudentDetails } from '../../../actions/details.actions';
import { likeStudent, rejectStudent } from '../../../actions/offer.action';
import { isEmpty, timestampParser } from '../../utils';
import StudentDetails from './StudentDetails';

const OfferDetails = (offerId) => {
    const offer = useSelector((state)=> state.offerReducer)
    const students = useSelector((state)=> state.allStudentsReducer)
    const [updateOffer, setUpdateOffer] = useState(false);
    const [checkApplications, setCheckApplications] = useState(false);
    const [detailsId, setDetailsId] = useState(null)
    const [viewProfile, setViewProfile] = useState(false);
    const dispatch = useDispatch();
    
    const checkApplication = async ()=>{
        await dispatch(getAllOffers())
        setCheckApplications(true)

    }

    const checkStudentDetails = (id)=>{
        dispatch(getStudentDetails(id))
        setDetailsId(id)
        setViewProfile(true)
    }

    const handleLike = async(offerId, applicationId)=>{
        await dispatch(likeStudent(offerId, applicationId))
        await dispatch(getAllOffers())
      

    }

    const handleReject = async (offerId, applicationId)=>{
        await dispatch(rejectStudent(offerId, applicationId))
        await dispatch(getAllOffers())
    }

    const handleReturn = async()=>{
        await dispatch(getAllOffers())
        setCheckApplications(false)
    }
   
    
    return(
        <>
            {updateOffer === false && checkApplications=== false && (
                <div className="details container">
                    <div className="offer-details-container" style={{border:  '2px solid blue', width:'30%'}}>
                        <div>Position : {offer.position}</div>
                        <div>Description :  {offer.description} </div>
                        <div>Hiring possibility :  {offer.hiringPossibility} </div>
                        <div>Starting date :  {offer.internshipStart} </div>
                        <div> Duration :  {offer.internshipDuration} </div>
                        <div>Place :  {offer.internshipPlace} </div>
                        <div>Face to face : {offer.faceToface} </div>      
                    </div>
                        {  !isEmpty(offer.applications) && (
                            <button onClick={(e)=>checkApplication()}>
                                Voir les candidats 
                            </button>
                            )
                        }
                    <button onClick={(e)=>setUpdateOffer(true)}> Modifier l'offre </button>
                    </div>
                )
            }
            { checkApplications && !isEmpty(offer.applications) && (
                <div className="applications-list-container">
                        { viewProfile === false && (
                        <div>
                            <h1>Liste des candidats </h1>
                            <ol>
                                { 
                                    offer.applications.map((application)=>{
                                        return(
                                            <li key={application._id}>
                                                <div>Student : { students.map((student)=>{
                                                    if (student._id === application.studentId){
                                                        return (<span key={student._id}>{student.firstname + " "+ student.lastname} 
                                                        <button onClick={(e)=>checkStudentDetails(application.studentId)}>profil</button>   </span>)
                                                    }else {
                                                        return null
                                                    }
                                                })
                                                } 
                                                </div>
                                                <div>Statut : {application.status}</div> 
                                                <div>Déposée le : {timestampParser(application.timestamp)}</div>
                                                <button onClick={(e)=>handleLike(offer._id, application._id)}>Like</button><button onClick={(e)=>handleReject(offer._id, application._id)}>Reject</button>
                                                <br></br>
                                                <br></br>
                                                
                                                <br></br>

                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                        )}
                        { viewProfile &&(
                            <div className="student-details-container">
                                <StudentDetails id={detailsId}/>
                                <button onClick={(e)=>setViewProfile(false)}>Hide</button>
                                <br></br>
                                <br></br>
                            </div>
                        )}
                        <button onClick={(e)=> handleReturn()} >Retour détails offre</button>
                    </div>
                )
            }
        </>
    )  
}   

export default OfferDetails;