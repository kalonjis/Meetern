import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllStudents } from '../../../actions/allStudents.actions'
import { getOffer } from '../../../actions/offer.action'

const OfferCard = ({offer}) => {
    const dispatch =useDispatch()

    const showDetails = (offerId) =>{
        dispatch(getAllStudents ())
        dispatch(getOffer(offerId))
    }
    
    return (
        <li className="offer-card-container">
            {
                offer.position
            }
            <span> <Link to={`/offers/${offer.position}`} onClick={showDetails(offer._id)}>View</Link></span>
        </li>
    )
}

export default OfferCard
