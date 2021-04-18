import React from 'react';
import OfferDetailsCompany from '../components/offers/companyOffers/Company.OfferDetails';
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOffer } from '../actions/offer.action';
import { getAllStudents } from '../actions/allStudents.actions'

const OfferDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    dispatch(getOffer(id))
    dispatch(getAllStudents())

    return (
      <div className="offers-page">
            <OfferDetailsCompany/>
      </div>
    ); 
}

export default OfferDetails
