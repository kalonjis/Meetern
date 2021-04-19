import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateOfferForm from './CreateOfferForm';
import OfferCard from '../OfferCard';
import { Link } from 'react-router-dom'

const OffersCompany = () =>{
    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const [myOffers, setMyOffers] = useState([]);
    const [addOffer, setAddOffer] = useState(false);

    useEffect(()=>{
        if(allOffers[0]){
            return setMyOffers(allOffers.filter(offer => offer.companyId === company._id))
        }
    },[allOffers, company])
    
    return (
        <>
            { addOffer === false &&(
                <div className="offers-company-container">
                    <h1>Welcome to the company offer page</h1>
                    <h2>Your offers list</h2> 
                    <button onClick={ e=> setAddOffer(true)}>ADD an OFFER</button>
                    <ul className="offers-company-list">
                        {
                            myOffers.map( offer=> (
                                <li key={offer._id}>
                                    <OfferCard  offer={offer} />
                                    <span> <Link to={`/offers/${offer._id}`}>View</Link></span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}
            {addOffer &&(
                <>
                <CreateOfferForm />
                <button onClick={ e=> setAddOffer(false)} >Cancel</button>
                </>
            )}
        </>
    )
}
export default OffersCompany;