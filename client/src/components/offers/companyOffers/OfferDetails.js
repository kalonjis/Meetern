import React from 'react';
import { useSelector } from 'react-redux';

const OfferDetails = (offerId) => {
    const offer = useSelector((state)=> state.offerReducer)
    console.log(offer.position)
    return(
        <div className="offer-details-container">
            <div>Position : {offer.position}</div>
            <div>Description :  {offer.description} </div>
            <div>Hiring possibility :  {offer.hiringPossibility} </div>
            <div>Starting date :  {offer.internshipStart} </div>
            <div> Duration :  {offer.internshipDuration} </div>
            <div>Place :  {offer.internshipPlace} </div>
            <div>Face to face : {offer.faceToface} </div>      
        </div>
    )  
}   

export default OfferDetails;