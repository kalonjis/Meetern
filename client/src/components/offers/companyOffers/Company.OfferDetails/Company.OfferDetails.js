import React, { useState } from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeStudent, rejectStudent } from '../../../../actions/offer.action'
import ApplicationCard from '../../ApplicationCard';
import { isEmpty } from '../../../utils';
import './Company.OfferDetails.css'
import OfferCard from '../../OfferCard';
import StudentCard from '../StudentCard';

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
        <div className= "company-offer-details-page-container">
            <OfferCard offer={offer}/>
            
            <div className="company-applications-list-container">
                <h2>Liste des candidats </h2>
                <>
                {applicationList.length === 0 ? (
                    <div>Not any application yet. Let's promote it!</div>
                    ):(
                    <ul className="company-applicationCards-container">
                        {applicationList.map((application) => (
                            <li key={application._id} className="company-applicationCard">
                                <StudentCard id={application.studentId} />
                                <ApplicationCard application={application} />
                                <div className="company-applicationCard-bottom">
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