import React, { useState } from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeStudent, rejectStudent } from '../../../../actions/offer.action'
import ApplicationCard from '../../ApplicationCard';
import { isEmpty } from '../../../utils';
import './Company.OfferDetails.css'
import OfferCard from '../../OfferCard';
import StudentCard from '../StudentCard';
import { getAllStudents } from '../../../../actions/allStudents.actions';

const OfferDetailsCompany = () => {
    const offer = useSelector((state)=> state.offerReducer);
    const [applicationList, setApplicationList] = useState([])
    const [fetchStudents, setFetchStudents] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    const fetchNewStudents = async()=>{
        await dispatch(getAllStudents ());
        setFetchStudents(false);
        console.log('students refreshed');
      }
  
    useEffect(()=>{
        if(fetchStudents){
          fetchNewStudents()
        }
    })
    
    useEffect(()=>{
        if(!isEmpty(offer) && fetchStudents===false){
            setIsLoading(false)
        }
    },[offer, fetchStudents])

    const handleLike = (offerId, applicationId)=>{
        dispatch(likeStudent (offerId, applicationId))
    }

    const handleReject = (offerId, applicationId)=>{
        dispatch(rejectStudent (offerId, applicationId))
    }

    return (
        <div className= "company-offer-details-page-container">
            { isLoading && (
                <i className="fas fa-spinner fa-spin"></i>
                )
            }
            { isLoading === false &&(
                <>
                <OfferCard offer={offer}/>
                <div className="company-applications-list-container">
                    <h2>Liste des candidats </h2>
                    <>
                    {offer.applications.length === 0 ? (
                        <div className="company-0-application-message">
                            Not any application yet. Let's promote it! Subscribe for a Premium account
                        </div>
                        ):(
                        <ul className="company-applicationCards-container">
                            {offer.applications.map((application) => (
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
                </>
                )
            }
        </div>
    )
}   

export default OfferDetailsCompany;