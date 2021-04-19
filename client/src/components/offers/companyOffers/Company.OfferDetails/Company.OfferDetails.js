import React, { useState } from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeStudent, rejectStudent } from '../../../../actions/offer.action'
import ApplicationCard from '../ApplicationCard';
import { isEmpty } from '../../../utils';
import './Company.OfferDetails.css'

const OfferDetailsCompany = () => {
    const offer = useSelector((state)=> state.offerReducer);
    const [applicationList, setApplicationList] = useState([])
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!isEmpty(offer)){
            let appList = []
            offer.applications.map( application =>{
            return appList.push(application)
            })
            setApplicationList(appList)
        }
    },[offer])

    const handleLike = (offerId, applicationId)=>{
        dispatch(likeStudent (offerId, applicationId))
    }

    const handleReject = (offerId, applicationId)=>{
        dispatch(rejectStudent (offerId, applicationId))
    }

    return (
        <div className= "company-offer-details-container">
            <h1>{offer.position}</h1>
            <div className="offer-details-container" style={{border: '2px solid blue', width:'30%'}}>
                <div>Description :  {offer.description} </div>
                <div>Hiring possibility :  {offer.hiringPossibility} </div>
                <div>Starting date :  {offer.internshipStart} </div>
                <div> Duration :  {offer.internshipDuration} </div>
                <div>Place :  {offer.internshipPlace} </div>
                <div>Face to face : {offer.faceToface} </div>
            </div>
            <div className="applications-list-container">
                <h2>Liste des candidats </h2>
                <>
                {applicationList.length === 0 ? (
                    <div>Not any application yet. Let's promote it!</div>
                    ):(
                    <ul className="applicationCard-container">
                        {applicationList.map((application) => (
                            <li key={application._id}>
                                <ApplicationCard application={application} />
                                <div className="application-card-row">
                                <button onClick={(e)=>handleLike(offer._id, application._id)} className="like">Like</button>
                                    <button onClick={(e)=>handleReject(offer._id, application._id)} className="reject"> Reject</button>
                                </div>
                            </li>
                            ))
                        }
                    </ul>
                    )
                }
                </>
            </div>
        </div>
    )
}   

export default OfferDetailsCompany;