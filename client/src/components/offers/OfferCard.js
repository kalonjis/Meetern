import React from 'react'

const OfferCard = ({offer}) => {
    
    return (
        <div>
            <h1>{offer.position}</h1>
            <div>
                <p>Description :  {offer.description} </p>
                <p>Hiring possibility :  {offer.hiringPossibility} </p>
                <p>Starting date :  {offer.internshipStart} </p>
                <p> Duration :  {offer.internshipDuration} </p>
                <p>Place :  {offer.internshipPlace} </p>
                <p>Face to face : {offer.faceToface} </p>
            </div>
        </div>
    )
}

export default OfferCard
