import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { getAllStudents } from '../../../actions/allStudents.actions';
// import { getOffer } from '../../../actions/offer.action';
// import OfferDetails from './Company.OfferDetails';
// import CreateOfferForm from './CreateOfferForm';
import OfferCard from './OfferCard';


const OffersCompany = () =>{
    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const [myOffers, setMyOffers] = useState([]);

    useEffect(()=>{
        if(allOffers[0]){
            return setMyOffers(allOffers.filter(offer => offer.companyId === company._id))
        }
    },[allOffers, company])
    
    return (
        <div className="offers-company-container">
            <h1>Welcome to the company offer page</h1>

            <h2>Your offers list</h2> 
            <button>ADD an OFFER</button>
            <ol className="offers-company-list">
                {
                    myOffers.map( offer=> (
                        <OfferCard key={offer._id} offer={offer} />
                    ))
                }
            </ol>
        </div>
    )
}
export default OffersCompany;