import React, { useState } from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudent} from '../../../../actions/student.action';
import { applyNow, getOffer } from '../../../../actions/offer.action';
import { isEmpty } from '../../../utils';
import ApplicationCard from '../../ApplicationCard';
import OfferCard from '../../OfferCard';
import CompanyCard from '../CompanyCard';
import { getAllCompanies } from '../../../../actions/allCompanies.actions';

const OfferDetailsStudent = () => {
    const offer = useSelector((state)=> state.offerReducer);
    const student = useSelector((state => state.studentReducer))
    const [fetchCompanies, setFetchCompanies] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    const fetchNewCompanies = async() =>{
        await dispatch(getAllCompanies());
        setFetchCompanies(false);
        console.log('companies refreshed');
    }

    const handleApply = async(offerId, studentId)=>{
        await dispatch(applyNow(offerId, studentId));
        await dispatch( getOffer(offerId) );
        await dispatch(getStudent(studentId));
        console.log('apply :'+offerId, studentId);
    }

    useEffect(()=>{
        if(fetchCompanies){
            fetchNewCompanies();
        }
    })

    useEffect(()=>{
        if(!isEmpty(offer) && !isEmpty(student) && fetchCompanies===false){
            setIsLoading(false)
        }
    },[offer, student, fetchCompanies])

    console.log(offer.companyId)
    console.log(student.firstname)

    return (
        <div className= "student-offer-details-page-container">
            {isLoading &&(
                <i className="fas fa-spinner fa-spin"></i>
                )
            }
            { isLoading === false &&(
                <div>
                    <OfferCard offer={offer}/>
                    <h2>About The company</h2>
                    <CompanyCard id={offer.companyId}/>
                    <h2>Application info</h2>
                    <>
                    { ((student.applications).includes(offer._id)) ? (
                        <div>
                            {   offer.applications.map( application =>{
                                    if (application.studentId === student._id){
                                        return <ApplicationCard application={application}/>
                                    }else{
                                        return null
                                    }
                                })
                            }
                           {offer.status === "open" ? <button>Annuler la candidature</button> : <div>Cette offre vient d'etre cloturée</div>}
                        </div>
                        ): (
                        <div>
                            {offer.status === "open" ? <div>Saisissez votre chance :<button onClick={e=>{handleApply(offer._id, student._id)}}> Apply Now</button> </div> : <div>Cette offre vient d'etre cloturée</div>}
                        </div>)
                    }
                    </>
                </div>  
                )
            }
        </div>
    )
}

export default OfferDetailsStudent