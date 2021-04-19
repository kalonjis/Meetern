import React, { useState } from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeStudent, rejectStudent } from '../../../actions/offer.action'
import ApplicationCard from './ApplicationCard';
import { isEmpty } from '../../utils';

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
                    applicationList.map((application)=> (
                        <li key={application._id}>
                        <ApplicationCard application={application} />
                        <button onClick={(e)=>handleLike(offer._id, application._id)}>Like</button><button onClick={(e)=>handleReject(offer._id, application._id)}>Reject</button>
                        </li>
                    ))
                }
            </ol>
        </div>

    </div>
    )
}   

export default OfferDetailsCompany;