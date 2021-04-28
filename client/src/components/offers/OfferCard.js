import React from 'react'
import {  timestampParser } from '../utils';


const OfferCard = ({offer}) => {
      
    return (
        <div className= "offerCard-container">
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
                <p> Number of applications : {offer.applications.length}</p>
            </div>
        </div>
    )
}

export default OfferCard
