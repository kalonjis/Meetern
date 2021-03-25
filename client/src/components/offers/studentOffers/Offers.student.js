import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getOffer } from '../../../actions/offer.action';
import OfferDetails from './Student.OfferDetails';
import {timestampParser} from '../../utils'


const OffersStudent = ()=>{
    const student = useSelector((state)=>state.studentReducer)
    const myApplications = student.applications;
    console.log(myApplications)
    const allOffers = useSelector((state)=>state.allOffersReducer)
    const opportunities = allOffers.filter((offer)=>(!myApplications.includes(offer._id)))
    console.log(opportunities)
    // const allCompanies = useSelector((state)=>state.allCompaniesReducer)
    // console.log(allCompanies)
    // console.log(allOffers)
    const dispatch = useDispatch();
    const [offerDetails, setOfferDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null)
    const [applied, setApplied] = useState(false)

    const showDetails = (offerId, type) =>{
        dispatch(getOffer(offerId))
        setDetailsId(offerId)
        setOfferDetails(true);
        setApplied(type);
    }
    
    return (
        <>
            {offerDetails === false &&(
                <>
                    <div className="offers-opportunities-container">
                        <h2>Find the perfect internship that fits to you the best</h2>
                        <ol>               
                            { opportunities.map((offer) => {
                                    return(
                                        <li key={offer._id} onClick={(e)=>{showDetails(offer._id, false)} }>
                                            {offer.position}
                                        </li>
                                    )
                                }
                            )}
                        </ol>
                    </div>
                    <div className="myApplications-container">
                        <h2> Your applications </h2>
                        <ol>
                            {   allOffers.map((offer)=>{
                                    if (myApplications.includes(offer._id)){
                                        return (
                                            <li key={offer._id} onClick={(e)=>{showDetails(offer._id, true)}}>
                                                {offer.position}  <span>
                                                    { offer.applications.map((application)=>{
                                                            if (application.studentId === student._id){
                                                                return (<>
                                                                    <span> Postulé le : {timestampParser(application.timestamp)}</span> 
                                                                    <span> Statut : {application.status}</span>
                                                                    </>
                                                                )
                                                            }else{
                                                                return null
                                                            }
                                                        })
                                                    }
                                                </span>
                                            </li>
                                        )
                                    }else{
                                        return null
                                    }
                                })

                            }
                        </ol>
                    </div>
                </>
                )
            }
            { offerDetails &&(
                <div> 
                    <OfferDetails offerId={detailsId} appliedYet={applied}/> 
                    <button onClick={(e)=> setOfferDetails(false)}>
                        Retour à la liste des offres de stage
                    </button>
                </div>
            )}
        </>

)
}
export default OffersStudent;