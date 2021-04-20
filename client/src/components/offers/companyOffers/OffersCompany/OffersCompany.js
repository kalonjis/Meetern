import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateOfferForm from '../CreateOfferForm';
import OfferCard from '../../OfferCard';
import { Link } from 'react-router-dom';
import './OffersCompany.css';


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
        <div className="offers-company-page-container">
            <h1>Welcome to the company offer page</h1>
            { addOffer === false &&(
                <div className="offers-company-list-section">
                    <h2>Your offers list 
                        <span> <button onClick={ e=> setAddOffer(true)}> ADD an OFFER</button></span>
                    </h2> 
                    <ul className="offers-company-list-container">
                        {
                            myOffers.map( offer=> (
                                <li key={offer._id} className="offerCard-company-container">
                                    <OfferCard  offer={offer} />
                                    <div className="offerCard-company-container-bottom"> 
                                        <button><Link to={`/offers/${offer._id}`}>View</Link></button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}
            {addOffer &&(
                <div className="create-offer-form-container">
                    <button onClick={ e=> setAddOffer(false)} >Cancel</button>
                    <CreateOfferForm />
                    <button onClick={ e=> setAddOffer(false)} >Cancel</button>
                </div>
            )}
        </div>
    )
}
export default OffersCompany;