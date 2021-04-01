import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getOffer } from '../../../actions/offer.action';
import OfferDetails from './Student.OfferDetails';
import {timestampParser} from '../../utils'
import { getAllOffers } from '../../../actions/allOffers.actions';


const OffersStudent = ()=>{
    const student = useSelector((state)=>state.studentReducer)
    const myApplications = student.applications;
    const allOffers = useSelector((state)=>state.allOffersReducer)
    const opportunities = allOffers.filter((offer)=>(!myApplications.includes(offer._id)))
    const dispatch = useDispatch();
    const [offerDetails, setOfferDetails] = useState(false);
    const [applied, setApplied] = useState(false);
    const [applicId, setApplicId] = useState(null)

    const showDetails = async (offerId, type, applicationId) =>{
        await dispatch(getOffer(offerId))
        setApplied(type);
        setApplicId(applicationId)
        setOfferDetails(true);
    }
    const handleReturn = async()=>{
        await dispatch(getAllOffers())
        setOfferDetails(false)
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
                                        <li key={offer._id} onClick={(e)=>{showDetails(offer._id, false, null)} }>
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
                                            <li key={offer._id} >
                                                {offer.position}  <span>
                                                    { offer.applications.map((application)=>{
                                                            if (application.studentId === student._id){
                                                                return (<>
                                                                    <span> Postulé le : {timestampParser(application.timestamp)} </span> 
                                                                    <span> Statut : {application.status} </span>
                                                                    <span><button onClick={(e)=>{(application.status ==="cancelled by the student"? showDetails(offer._id, false, null):showDetails(offer._id, true, application._id ))}}> Détail </button></span>
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
                    <OfferDetails appliedYet={applied} applicationId={applicId}/> 
                    <button onClick={(e)=> handleReturn()}>
                        Retour à la liste des offres de stage
                    </button>
                </div>
            )}
        </>
    )
}
export default OffersStudent;