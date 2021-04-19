import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateOfferForm from './CreateOfferForm';
import OfferCard from '../OfferCard';

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
                    <ol className="offers-company-list">
                        {
                            myOffers.map( offer=> (
                                <OfferCard key={offer._id} offer={offer} />
                            ))
                        }
                    </ol>
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