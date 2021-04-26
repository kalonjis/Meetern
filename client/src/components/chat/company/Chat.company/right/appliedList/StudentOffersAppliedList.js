import React, { useEffect, useState } from 'react';
import { isEmpty, timestampParser } from '../../../../../utils';
import OfferCard from '../../../../../offers/OfferCard'


const StudentOffersAppliedList = (props) => {
    const [id, setId] = useState(null)
    const myOffers = props.myOffers
    const [offerDetails, setOfferDetails] = useState(null)

    useEffect(()=>{
        if( !isEmpty(props.id)){
            setId(props.id)
        }
    }, [props.id])
    console.log("newId :"+ id )

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
                                        <li key={application._id} className="offer-info" onClick={e => setOfferDetails(offer)}>
                                            <div style={offer.companyChoice === id ? {color: "gold"}: {color: "black"}}> {offer.position} 
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
                <div className="chat-company-offerCard-container">
                    { offerDetails === null ? (
                            <div> cliquez sur une offre pour voir les details </div>
                        ):( 
                            <div>
                            <OfferCard offer={offerDetails} />
                            <button onClick={ e => setOfferDetails(null)} > Hide Details </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentOffersAppliedList
