import React from 'react'
import { Link } from 'react-router-dom'

const OfferCard = ({offer}) => {
    
    return (
        <li className="offer-card-container">
            {offer.position}
            <span> <Link to={`/offers/${offer._id}`}>View</Link></span>
        </li>
    )
}

export default OfferCard
