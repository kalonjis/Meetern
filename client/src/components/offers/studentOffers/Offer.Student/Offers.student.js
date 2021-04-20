import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getOffer } from '../../../../actions/offer.action';
import OfferDetails from '../Student.OfferDetails/Student.OfferDetails';
import {isEmpty, timestampParser} from '../../../utils'
import { getAllOffers } from '../../../../actions/allOffers.actions';
import OfferCard from '../../OfferCard';
import { Link } from 'react-router-dom'
import ApplicationCard from '../../ApplicationCard';
import './Offers.student.css'




const OffersStudent = ()=>{
    const student = useSelector((state)=>state.studentReducer);
    const [applicationsIdList, setApplicationsIdList] = useState([]);
    const allOffers = useSelector((state)=>state.allOffersReducer);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(()=>{
        if(!isEmpty(student)){
            setApplicationsIdList(student.applications)
        }
    },[student])

    useEffect(()=>{
        if(!isEmpty(allOffers)){
            setOpportunities(allOffers.filter( offer => !applicationsIdList.includes(offer._id)))
        }
    }, [allOffers, applicationsIdList])
    console.log(applicationsIdList)


    // const opportunities = 
    // const dispatch = useDispatch();
    // const [offerDetails, setOfferDetails] = useState(false);
    // const [applied, setApplied] = useState(false);
    // const [applicId, setApplicId] = useState(null)

    // const showDetails = async (offerId, type, applicationId) =>{
    //     await dispatch(getOffer(offerId))
    //     setApplied(type);
    //     setApplicId(applicationId)
    //     setOfferDetails(true);
    // }
    // const handleReturn = async()=>{
    //     await dispatch(getAllOffers())
    //     setOfferDetails(false)
    // }
    return (
        <div className="offers-student-container">
            student
            <div className="opportunities-container">
                <h2>Find the perfect internship that fits to you the best</h2>
                <ul>
                    {
                        opportunities.map(offer => (
                            <li key={offer._id}>
                                <OfferCard  offer={offer} />
                                <Link to={`/offers/${offer._id}`}>View</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="myApplications-container">
                <h2> Your applications </h2>
                <ul>
                    {
                        allOffers.map((offer)=>{
                            if (applicationsIdList.includes(offer._id)){
                                return (
                                    <li key={offer._id} className= "applicationCard-container">
                                            {   <>
                                                <OfferCard offer={offer}/>
                                                {offer.applications.map( application =>{
                                                    if(application.studentId === student._id){
                                                        return <ApplicationCard application={application} />
                                                    }else{
                                                        return null
                                                    }
                                                })}
                                                </>
                                            }
                                    </li>
                                    )
                            } else {
                                return null
                            }      
                        })
                    }
                </ul>
            </div>
        </div>
        // <>
        //     {offerDetails === false &&(
        //         <>
        //                 <ol>               
        //                     { opportunities.map((offer) => {
        //                             return(
        //                                 <li key={offer._id} onClick={(e)=>{showDetails(offer._id, false, null)} }>
        //                                     {offer.position}
        //                                 </li>
        //                             )
        //                         }
        //                     )}
        //                 </ol>
        //             </div>
        //                     {   allOffers.map((offer)=>{
        //                             if (myApplications.includes(offer._id)){
        //                                 return (
        //                                     <li key={offer._id} >
        //                                         {offer.position}  <span>
        //                                             { offer.applications.map((application)=>{
        //                                                     if (application.studentId === student._id){
        //                                                         return (<>
        //                                                             <span> Postulé le : {timestampParser(application.timestamp)} </span> 
        //                                                             <span> Statut : {application.status} </span>
        //                                                             <span><button onClick={(e)=>{(application.status ==="cancelled by the student"? showDetails(offer._id, false, null):showDetails(offer._id, true, application._id ))}}> Détail </button></span>
        //                                                             </>
        //                                                         )
        //                                                     }else{
        //                                                         return null
        //                                                     }
        //                                                 })
        //                                             }
        //                                         </span>
        //                                     </li>
        //                                 )
        //                             }else{
        //                                 return null
        //                             }
        //                         })

        //                     }
        //                 </ol>
        //             </div>
        //         </>
        //         )
        //     }
        //     { offerDetails &&(
        //         <div> 
        //             <OfferDetails appliedYet={applied} applicationId={applicId}/> 
        //             <button onClick={(e)=> handleReturn()}>
        //                 Retour à la liste des offres de stage
        //             </button>
        //         </div>
        //     )}
        // </>
    )
}
export default OffersStudent;