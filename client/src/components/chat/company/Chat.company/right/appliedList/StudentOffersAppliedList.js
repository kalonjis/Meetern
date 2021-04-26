import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOffer, selectStudent } from '../../../../../../actions/offer.action';
import { isEmpty, timestampParser } from '../../../../../utils';
import OfferCard2 from './OfferCard2';


const StudentOffersAppliedList = (props) => {
    const [id, setId] = useState(null)
    const myOffers = props.myOffers
    const [offerDetails, setOfferDetails] = useState(false)
    const dispatch = useDispatch()


    useEffect(()=>{
        if( !isEmpty(props.id)){
            setOfferDetails(false)
            setId(props.id)
        }
    }, [props.id])
    console.log("newId :"+ id )

    const getOfferDetails = async (offerId)=>{
        await dispatch( getOffer(offerId))
        setOfferDetails(true)
    }

    const handleSelect = async(offerid, applicationid) =>{
        await dispatch( selectStudent(offerid, applicationid))
        console.log("application selected")

    }

    return (
        <div className="student-applications-list-container" >
            <div>
                <h3>Candidat pour les stages suivants:</h3>
                <ul className="offers-list-container">
                    {
                        myOffers.map( offer => (
                            offer.applications.map( application => {
                                if ( application.studentId === id){
                                    return (
                                        <li key={application._id} className="offer-info">
                                            <div style={offer.companyChoice === id ? {color: "gold"}: {color: "black"}} onClick={e => getOfferDetails(offer._id)}>
                                                {offer.position} 
                                                <span>, <b>Sent</b> : {timestampParser(application.timestamp)} </span>
                                                <span>, <b>Status</b> : {application.status} </span>
                                            </div>
                                            {application.status === "selected" ? (
                                                    <button>deselect</button>
                                                ): (
                                                    <button onClick={e=> handleSelect(offer._id, application._id)}>Select</button>
                                                )
                                            } 
                                            <button>reject</button>
                                        </li>
                                    )
                                }else return null
                            })
                        ))
                    }
                </ul>
                <div className="chat-company-offerCard-container">
                    { offerDetails === false ? (
                            <div> cliquez sur une offre pour voir les details </div>
                        ):( 
                            <div>
                                <OfferCard2 />
                                <button onClick={ e => setOfferDetails(false)} > Hide Details </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentOffersAppliedList
