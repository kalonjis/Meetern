import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDetails } from '../../../actions/details.actions';
import { likeStudent, rejectStudent } from '../../../actions/offer.action';
import { isEmpty, timestampParser } from '../../utils';
import StudentDetails from './StudentDetails';

const OfferDetails = (offerId) => {
    const offer = useSelector((state)=> state.offerReducer)
    const students = useSelector((state)=> state.allStudentsReducer)
    const [updateOffer, setUpdateOffer] = useState(false);
    const [checkApplication, setCheckApplication] = useState(false);
    const [studentDetails, setStudentDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null)

    const dispatch = useDispatch();
    
    const checkStudentDetails = (id)=>{
        dispatch(getStudentDetails(id))
        setDetailsId(id)
        setStudentDetails(true)
    }

    const handleLike =(offerId, applicationId)=>{
        dispatch(likeStudent(offerId, applicationId))
    }

    const handleReject = (offerId, applicationId)=>{
        dispatch(rejectStudent(offerId, applicationId))

    }
    
    return(
        <>
            {updateOffer === false && checkApplication=== false && (
                <div className="details container">
                    <div className="offer-details-container">
                        <div>Position : {offer.position}</div>
                        <div>Description :  {offer.description} </div>
                        <div>Hiring possibility :  {offer.hiringPossibility} </div>
                        <div>Starting date :  {offer.internshipStart} </div>
                        <div> Duration :  {offer.internshipDuration} </div>
                        <div>Place :  {offer.internshipPlace} </div>
                        <div>Face to face : {offer.faceToface} </div>      
                    </div>
                        {  !isEmpty(offer.applications) && (
                            <button onClick={(e)=>setCheckApplication(true)}>
                                Voir les candidats 
                            </button>
                            )
                        }
                    <button onClick={(e)=>setUpdateOffer(true)}> Modifier l'offre </button>
                    </div>
                )
            }
            { checkApplication && !isEmpty(offer.applications) &&(
                <div className="applications-list-container">
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
                </div>
                )
            }
            { studentDetails &&(
                <div className="student-details-container">
                    <StudentDetails id={detailsId}/>
                    <br></br>
                    <button onClick={(e)=>setStudentDetails(false)}>Hide</button>
                    <br></br>
                </div>
            )}
            <button onClick={(e)=>setCheckApplication(false)} >Retour détails offre</button>
        </>
    )  
}   

export default OfferDetails;