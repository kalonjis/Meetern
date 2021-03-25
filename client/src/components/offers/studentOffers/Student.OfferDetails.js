import React, {  useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from '../../../actions/details.actions';
import { applyNow } from '../../../actions/offer.action';
import { getStudent } from '../../../actions/student.action';
import {getAllOffers} from '../../../actions/allOffers.actions'
import CompanyDetails from './CompanyDetails';

const OfferDetails = (offerId, appliedYet) => {
    const offer = useSelector((state)=> state.offerReducer)
    const student = useSelector((state)=> state.studentReducer)
    console.log(offer)
    const companies = useSelector((state)=> state.allCompaniesReducer)
    console.log(companies)
    const [apply, setApply] = useState(false);
    const [cancel, setCancel] = useState(false)
    const [companyDetails, setCompanyDetails] = useState(false);
    const dispatch = useDispatch();

    const handleDetails =(id)=>{
        dispatch(getCompanyDetails(id))
    }
    
    const handleApply = async(offerId, studentId)=>{
        await dispatch(applyNow(offerId, studentId))
        dispatch(getStudent(studentId))
        dispatch(getAllOffers())
        setApply(true)
        console.log('apply :'+offerId, studentId)
    }

    const handelCancel = async (offerId, studentId) =>{
        setCancel(true)
    }

    const handleReturn =(e)=>{
        setCompanyDetails(false)
        setCancel(false)
    }
   

    return(
        <>
            {companyDetails === false && apply === false && cancel === false &&(
                <div className="details container">
                    <div className="offer-details-container" style={{border:  '2px solid blue', width:'30%'}}>
                        <div>Position : {offer.position}</div>
                        <div>Description :  {offer.description} </div>
                        <div>Hiring possibility :  {offer.hiringPossibility} </div>
                        <div>Starting date :  {offer.internshipStart} </div>
                        <div> Duration :  {offer.internshipDuration} </div>
                        <div>Place :  {offer.internshipPlace} </div>
                        <div>Face to face : {offer.faceToface} </div>      
                    </div>
                    <button onClick={(e)=>setCompanyDetails(true)}>
                        About <span>
                        {  companies.map((company)=> {
                                if (company._id === offer.companyId){
                                    return (
                                        <div key={company._id} onClick={handleDetails(offer.companyId)}>
                                            {company.companyName}
                                        </div>)
                                } else {
                                    return null
                                } 
                            })
                        } 
                        </span> 
                    </button>
                    {appliedYet === false && (<button onClick={(e)=> handleApply(offer._id, student._id)}> Postuler </button>)}
                    {appliedYet && (<button onClick={(e)=> handelCancel(offer._id, student._id)}> Annuler la candidature </button>)}
                    </div>
                )
            }
            { companyDetails && apply === false && cancel ===false &&(
                <div className="company-container">
                    <CompanyDetails/>
                    <button onClick={handleReturn}>Retour</button>
                </div>
                )
            }
            { apply && (
                <div> Merci pour votre candidature!
                      Multipliez vos chances de décrocher un stage en postulant à d'autres offres
                </div>
             )
            }
            { cancel && (
                <div> Nous comprenons: il y a tellement d'autres offres qui vous correspondent mieux!
                      Multipliez vos chances de décrocher un stage en postulant à d'autres offres
                </div>
             )
            }
        </>
    )  
}   

export default OfferDetails;