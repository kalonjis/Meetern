import React, { useState } from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeStudent, openOffer, rejectStudent } from '../../../../actions/offer.action'
import ApplicationCard from '../../ApplicationCard';
import { isEmpty } from '../../../utils';
import './Company.OfferDetails.css'
import OfferCard from '../../OfferCard';
import StudentCard from '../StudentCard';
import { getAllStudents } from '../../../../actions/allStudents.actions';
import { closeOffer } from '../../../../actions/offer.action';
import Select from 'react-select';



const OfferDetailsCompany = () => {
    const offer = useSelector((state)=> state.offerReducer);
    const [applications, setApplications] = useState(null)
    const [fetchStudents, setFetchStudents] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [openStatus, setOpenStatus] = useState(null);
    const [filter, setFilter] = useState({
        value: 0,
        label: "all"
    });
    const filterOption = [
        {
            value: 0,
            label: "all"
        },
        {
            value: 1,
            label: "pending"
        },
        {
            value: 2,
            label: "liked"
        },
        {
            value: 3,
            label: "rejected"
        },
        {
            value: 4,
            label: "selected"
        },
        {
            value: 5,
            label: "confirmed"
        }
    ];

    const filterApplications = ( applicationStatus) =>{
        if (applicationStatus.label === "all"){
            return setApplications(offer.applications)
        }
        setApplications(offer.applications.filter(application => application.status === applicationStatus.label))
    };


    const handleChange =(obj)=>{
        setFilter(obj)
    };

    const fetchNewStudents = async()=>{
        await dispatch(getAllStudents ());
        setFetchStudents(false);
        console.log('students refreshed');
    };
  
    useEffect(()=>{
        if(fetchStudents){
          fetchNewStudents()
        }
    });
    
    useEffect(()=>{
        if(!isEmpty(offer) && fetchStudents===false){
            setApplications(offer.applications)
            setIsLoading(false)
            setOpenStatus(offer.status === "open" ? true : false)
        }
        
    },[offer, fetchStudents]);

    const handleClose = async(offerId)=>{
        if (window.confirm('Voulez-vous cloturer cette offre? ')){
            await dispatch(closeOffer(offerId))
            setOpenStatus(false);
            }
    };

    const handleOpen = async(offerId)=>{
        await dispatch(openOffer(offerId))
        setOpenStatus(true)
    };

    const handleLike = (offerId, applicationId)=>{
        dispatch(likeStudent (offerId, applicationId))
    };

    const handleReject = (offerId, applicationId)=>{
        dispatch(rejectStudent (offerId, applicationId))
    };

    return (
        <div className= "company-offer-details-page-container">
            { isLoading && (
                <i className="fas fa-spinner fa-spin"></i>
                )
            }
            { isLoading === false &&(
                <>
                <div className="offer-details-container">
                    <OfferCard offer={offer}/>
                    <div className="change-status-button">
                        { openStatus && (
                            <button className="close-button" onClick={ e=> handleClose(offer._id)}> Close Offer</button>
                            )
                        }
                        {openStatus === false && (
                            <button className="open-button" onClick={ e=> handleOpen(offer._id)}> Open Offer</button>
                            )
                        }
                    </div>
                </div>

                <div className="company-applications-list-container">
                    <h2>Liste des candidats </h2>
                    <div className="applications-filter">
                        <Select
                            value = {filter}
                            options={filterOption}
                            onChange = {handleChange}
                            // isDisabled = {option => option.isDisabled}
                            // getOptionLabel ={ option => option.name}
                        /><span>
                            <button onClick={ e => filterApplications(filter)}> Filter</button>
                        </span>
                    </div>
                    <>
                    {offer.applications.length === 0 ? (
                        <div className="company-0-application-message">
                            Not any application yet. Let's promote it! Subscribe for a Premium account
                        </div>
                        ):(
                        <ul className="company-applicationCards-container">
                            {applications.map((application) => (
                                <li key={application._id} className="company-applicationCard">
                                    <StudentCard id={application.studentId} status={application.status}/>
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