import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../../utils';

const OfferDetails = (offerId) => {
    const offer = useSelector((state)=> state.offerReducer)
    // const companies = useSelector((state)=> state.allCompaniesReducer)
    // console.log(companies)
    const [updateOffer, setUpdateOffer] = useState(false);
    const [checkApplication, setCheckApplication] = useState(false);


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
                                            <div>Student : {application.studentId} <button>voir le profil</button> </div>
                                            <div>Statut : {application.status}</div> 
                                            <div>Déposée le : {timestampParser(application.timestamp)}</div>
                                            <button>Like</button> <button>Reject</button>
                                            <br></br>
                                            <br></br>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                              
                    </div>
                    <button onClick={(e)=>setCheckApplication(false)} >Retour</button>
                </div>
                )
            }
        </>
    )  
}   

export default OfferDetails;