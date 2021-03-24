import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../../actions/allStudents.actions';
import { getOffer } from '../../../actions/offer.action';
import OfferDetails from './Company.OfferDetails';
import CreateOfferForm from './CreateOfferForm';


const OffersCompany = () =>{
    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const myOffers = allOffers.filter((offer)=> (offer.companyId === company._id))
    const [createForm, setCreateForm] = useState(false);
    const [offerDetails, setOfferDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null)
    const dispatch = useDispatch();

    

    const showDetails = (offerId) =>{
        dispatch(getAllStudents())
        dispatch(getOffer(offerId))
        setDetailsId(offerId)
        setOfferDetails(true);
    }

    // function used as props for <CreatForm> (line 64)
    const handleSubmit = (e)=>{
        e.preventDefault();
        setCreateForm(false)
    }

    return (
        <div className="offers-company-container">
            <h1>Welcome to the company offer page</h1>            
            { createForm === false && offerDetails === false &&(
                <>
                <button onClick={(e)=> setCreateForm(true)}> Add an offer</button>
                <div> 
                    <h2>Your offers list</h2> 
                    <ol>               
                        { myOffers.map((offer) => {
                            return(
                                 <li key={offer._id} onClick={(e)=>{showDetails(offer._id)} }>
                                     {offer.position}
                                </li>
                                ) 
                            })
                        }                       
                    </ol>
                </div>
             </>
            )}
            { createForm === false && offerDetails &&(
                <div> 
                    <OfferDetails offerId={detailsId}/> 
                    <button onClick={(e)=> setOfferDetails(false)}>
                        Retour à la liste des offres
                    </button>
                </div>
            )}
            { createForm && (
                <div>
                    <CreateOfferForm submit={handleSubmit}/> 
                    <button onClick={(e)=> setCreateForm(false)}> Retour </button>
                </div>
            )}
        </div>
    )
}
export default OffersCompany;