import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOffer } from '../../../../../../actions/offer.action';
import { getAllOffers } from '../../../../../../actions/allOffers.actions';
import { isEmpty, timestampParser } from '../../../../../utils';
import OfferCard2 from './OfferCard2';


const StudentOffersAppliedList = (props) => {
    const [id, setId] = useState(null)
    const myOffers = props.myOffers
    const [offerDetails, setOfferDetails] = useState(false)
    const [applicationId, setApplicationId] = useState(null)
    const dispatch = useDispatch()


    useEffect(()=>{
        if( !isEmpty(props.id)){
            setId(props.id)
            setOfferDetails(false)
        }
    }, [props.id])
    console.log("newId :"+ id )

    const handleReturn = ()=>{
        dispatch( getAllOffers())
        setOfferDetails(false)
        console.log("handlereturned")
    }
    
    const getOfferDetails = async (offerId, applicationId)=>{
        await dispatch( getOffer(offerId))
        setApplicationId(applicationId)
        setOfferDetails(true)
    }

    return (
        <div className="student-applications-list-container" >
            { offerDetails === false && (
                <div>
                    <h3>Candidat pour les stages suivants:</h3>
                    <ul className="offers-list-container">
                        { myOffers.map( offer => (
                                offer.applications.map( application => {
                                    if ( application.studentId === id){
                                        return (
                                            <li key={application._id} className="offer-info">
                                                <div style={application.status === "selected" ? {color: "gold"}: {color: "black"}} onClick={e => getOfferDetails(offer._id, application._id)}>
                                                    {offer.position} 
                                                    <span>, <b>Sent</b> : {timestampParser(application.timestamp)} </span>
                                                    <span>, <b>Status</b> : {application.status} </span>
                                                </div>
                                            </li>
                                        )
                                    }else return null
                                })
                            ))
                        }
                    </ul>
                    <div> cliquez sur une offre pour voir les details </div>
                </div>
                )
            }
            { offerDetails && (
                <div className="chat-company-offerCard-container">
                    <button onClick={ e => handleReturn()}> retour </button>
                    <OfferCard2 applicationId={applicationId} />
                </div>
                )   
            }
        </div>
    )
}

export default StudentOffersAppliedList
