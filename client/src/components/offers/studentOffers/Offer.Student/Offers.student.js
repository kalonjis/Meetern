import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../../utils'
import OfferCard from '../../OfferCard';
import { Link } from 'react-router-dom'
import ApplicationCard from '../../ApplicationCard';
import './Offers.student.css'


const OffersStudent = ()=>{
    const student = useSelector((state)=>state.studentReducer);
    const allOffers = useSelector((state)=>state.allOffersReducer);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(()=>{
        if(!isEmpty(allOffers) && !isEmpty(student)){
            setOpportunities(allOffers.filter( offer => !student.applications.includes(offer._id) && offer.status === "open"))
        }
    }, [allOffers, student])

    return (
        <div className="offers-student-page-container">
            <h1>Welcome to the student offer page</h1>
            <div className="opportunities-container">
                <h2>Find the perfect internship that fits to you the best</h2>
                <ul>
                    {
                        opportunities.map(offer => (
                            <li key={offer._id} className="opportunityCard-student-container">
                                <OfferCard  offer={offer} />
                                <div className="student-opportunityCard-bottom">
                                    <Link to={`/offers/${offer._id}`}>View</Link>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="student-applications-container">
                <h2> Your applications </h2>
                <ul>
                    {
                        allOffers.map((offer)=>{
                            if (student.applications.includes(offer._id)){
                                return (
                                    <li key={offer._id} className= "student-applicationCard-container">
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
    )
}
export default OffersStudent;