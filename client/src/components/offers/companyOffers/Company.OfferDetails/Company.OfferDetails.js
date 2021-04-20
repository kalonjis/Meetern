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
        <div className= "company-offer-details-container">
            <OfferCard offer={offer}/>
            
            <div className="applications-list-container">
                <h2>Liste des candidats </h2>
                <>
                {applicationList.length === 0 ? (
                    <div>Not any application yet. Let's promote it!</div>
                    ):(
                    <ul className="applicationCard-container">
                        {applicationList.map((application) => (
                            <li key={application._id}>
                                <StudentCard id={application.studentId} />
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