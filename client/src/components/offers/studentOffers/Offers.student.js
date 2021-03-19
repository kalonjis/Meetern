import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getOffer } from '../../../actions/offer.action';


const OffersStudent = ()=>{
    const allCompanies = useSelector((state)=>state.allCompaniesReducer)
    const allOffers = useSelector((state)=>state.allOffersReducer)
    console.log(allCompanies)
    console.log(allOffers)
    const dispatch = useDispatch();
    const [offerDetails, setOfferDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null)



    const showDetails = (offerId) =>{
        setOfferDetails(true);
        dispatch(getOffer(offerId))
        setDetailsId(offerId)
    }
    return (
        <>
            {offerDetails === false &&(
                <div>
                    <h2>Find the perfect internship that fits to you the best</h2>
                    <ol>               
                        { allOffers.map((offer) => {
                            return(
                                <li key={offer._id} onClick={(e)=>{showDetails(offer._id)} }>
                                    {offer.position}
                                </li>
                                ) 
                            })
                        }                       
                    </ol>
                </div>
                )
            }
        </>

)
}
export default OffersStudent;