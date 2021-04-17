import React from 'react';
import { useSelector } from 'react-redux';

// import {useParams} from 'react-router-dom';


const OfferDetails = () => {

    const offer = useSelector(state => state.offerReducer);
    console.log(offer)

    return (
        <div className= "company-offer-details-container">
            <h1>{offer.position}</h1>
        </div>
    )
}

export default OfferDetails
