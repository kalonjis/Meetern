import React from 'react';
import { useSelector } from 'react-redux';

// import {useParams} from 'react-router-dom';


const OfferDetails = () => {

    const offer = useSelector(state => state.offerReducer);
    console.log(offer)

    return (
        <div className= "company-offer-details-container">
            <h1>{offer.position}</h1>
            <div className="offer-details-container" style={{border:  '2px solid blue', width:'30%'}}>
                <div>Description :  {offer.description} </div>
                <div>Hiring possibility :  {offer.hiringPossibility} </div>
                <div>Starting date :  {offer.internshipStart} </div>
                <div> Duration :  {offer.internshipDuration} </div>
                <div>Place :  {offer.internshipPlace} </div>
                <div>Face to face : {offer.faceToface} </div>
            </div>

        </div>
    )
}

export default OfferDetails
