import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOffers } from '../actions/allOffers.actions';
import { likeStudent, rejectStudent } from '../actions/offer.action';
import ApplicationCard from '../components/offers/companyOffers/ApplicationCard';

// import {useParams} from 'react-router-dom';


const OfferDetails = () => {

    const offer = useSelector(state => state.offerReducer);
    const [applications, setApplications] = useState([])
    
    useEffect(()=>{
        if(offer){
            setApplications(offer.applications)
        }
    }, [offer])
    console.log(applications)

    const dispatch = useDispatch();

    const handleLike = async(offerId, applicationId)=>{
        await dispatch(likeStudent (offerId, applicationId))
        await dispatch( getAllOffers)
    }

    const handleReject = async (offerId, applicationId)=>{
        await dispatch(rejectStudent (offerId, applicationId))
        await dispatch( getAllOffers)

    }

    return (
        <div className= "company-offer-details-container">
            <h1>{offer.position}</h1>
            <div className="offer-details-container" style={{border:  '2px solid blue', width:'30%'}}>
                <div>Description :  {offer.description} </div>
                <div>Hiring possibility :  {offer.hiringPossibility} </div>
                <div>Starting date :  {offer.internshipStart} </div>
                <div> Duration :  {offer.internshipDuration} </div>
                <div>Place :  {offer.internshipPlace} </div>
                <div>Face to face : {offer.faceToface} </div>
            </div>

            <div className="applications-list-container">
                <h2>Liste des candidats </h2>
                <ol>
                    {
                        applications.map((application)=> (
                            <>
                            <ApplicationCard key={application._id} application={application} />
                            <button onClick={(e)=>handleLike(offer._id, application._id)}>Like</button><button onClick={(e)=>handleReject(offer._id, application._id)}>Reject</button>
                            </>
                        ))

                    }
                </ol>
            </div>

        </div>
    )
}

export default OfferDetails
