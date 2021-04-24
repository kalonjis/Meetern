import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { isEmpty } from '../../utils';
import OfferCard from '../../offers/OfferCard'


const StudentOffersAppliedList = ({id}) => {

    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const [isLoading, setIsLoading] = useState(true)
    const [myOffers, setMyOffers] = useState([]);
    const [offerDetails, setOfferDetails] = useState(null)


    useEffect(()=>{
        if (!isEmpty(allOffers)){
            setMyOffers(allOffers.filter( offer => offer.companyId === company._id))
            setIsLoading(false)
        }
    },[allOffers, company])
    
       return (
        <div className="student-applications-list-container" >
            { isLoading && (
                <i className="fas fa-spinner fa-spin"></i>
                )
            }
            { isLoading === false && !isEmpty(myOffers) && (
                <div>
                    <h3>Candidat pour les stages suivants:</h3>
                    <ul className="offers-list-container">
                        {
                           myOffers.map( offer => (
                               offer.applications.map( application => {
                                   if ( application.studentId === id){
                                       return (
                                            <li key={offer._id} className="offer-info">
                                                <div> {offer.position} 
                                                    <span> 
                                                        <button onClick={e => setOfferDetails(offer)}> details</button>
                                                    </span>
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
            )}
        </div>
    )
}

export default StudentOffersAppliedList
