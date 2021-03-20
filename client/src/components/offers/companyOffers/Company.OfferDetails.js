import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const OfferDetails = (offerId) => {
    const offer = useSelector((state)=> state.offerReducer)
    // const companies = useSelector((state)=> state.allCompaniesReducer)
    // console.log(companies)
    const [updateOffer, setUpdateOffer] = useState(false);
    const [checkApplication, setCheckApplication] = useState(false);


    return(
        <>
            {updateOffer === false && checkApplication=== false &&(
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
                        {  offer.applications[0] && (
                            <button onClick={(e)=>setCheckApplication(true)}>
                                Voir les candidats 
                            </button>
                            )
                        }
                    <button onClick={(e)=>setUpdateOffer(true)}> Modifier l'offre </button>
                    </div>
                )
            }
            { checkApplication && offer.applications[0] &&(
                <div className="applications-list-container">
                    <div>Liste des candidats {offer.applications[0].studentId}</div>
                    <button onClick={(e)=>setCheckApplication(false)} >Retour</button>
                </div>
                )
            }
        </>
    )  
}   

export default OfferDetails;