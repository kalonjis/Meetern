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
        setFetchCompanies(false)
    }

    const handleApply = async(offerId, studentId)=>{
        await dispatch(applyNow(offerId, studentId));
        await dispatch( getOffer(offerId) );
        await dispatch(getStudent(studentId));
        console.log('apply :'+offerId, studentId);
    }

    useEffect(()=>{
        fetchNewCompanies()
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
                <h2>Loading</h2>
                )
            }
            { isLoading===false &&(
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
                           <button>Annuler la candidature</button>
                        </div>
                        ): (
                        <div>
                            Saisissez votre chance : <button onClick={e=>{handleApply(offer._id, student._id)}}> Apply Now</button>
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




    
//     const handleApply = async(offerId, studentId)=>{
//         await dispatch(applyNow(offerId, studentId))
//         dispatch(getStudent(studentId))
//         dispatch(getAllOffers())
//         setApply(true)
//         console.log('apply :'+offerId, studentId)
//     }

//     const handelCancel = async (offerId,applicationId, studentId) =>{
//         await dispatch(cancelApplication(offerId,applicationId, studentId))
//         dispatch(getStudent(studentId))
//         dispatch(getAllOffers())
//         setCancel(true)
//     }

//     const handleReturn = async(studentId)=>{
//         await dispatch(getStudent(studentId))
//         dispatch(getAllOffers())
//         setCompanyDetails(false)
//         setCancel(false)
//     }
   

//     return(
//         <>
//             {companyDetails === false && apply === false && cancel === false &&(
//                 <div className="details container">
//                     <div className="offer-details-container" style={{border:  '2px solid blue', width:'30%'}}>
//                         <div>Position : {offer.position}</div>
//                         <div>Description :  {offer.description} </div>
//                         <div>Hiring possibility :  {offer.hiringPossibility} </div>
//                         <div>Starting date :  {offer.internshipStart} </div>
//                         <div> Duration :  {offer.internshipDuration} </div>
//                         <div>Place :  {offer.internshipPlace} </div>
//                         <div>Face to face : {offer.faceToface} </div>      
//                     </div>
//                     <button onClick={(e)=>setCompanyDetails(true)}>
//                         About <span>
//                         {  companies.map((company)=> {
//                                 if (company._id === offer.companyId){
//                                     return (
//                                         <div key={company._id} onClick={(e)=>handleDetails(offer.companyId)}>
//                                             {company.companyName}
//                                         </div>)
//                                 } else {
//                                     return null
//                                 } 
//                             })
//                         } 
//                         </span> 
//                     </button>
//                     {props.appliedYet === false && (<button onClick={(e)=> handleApply(offer._id, student._id)}> Postuler </button>)}
//                     {props.appliedYet && (<button onClick={(e)=> handelCancel(offer._id,applicId, student._id)}> Annuler la candidature </button>)}
//                     </div>
//                 )
//             }
//             { companyDetails && apply === false && cancel ===false &&(
//                 <div className="company-container">
//                     <CompanyDetails/>
//                     <button onClick={(e)=>handleReturn(student._id)}>Retour</button>
//                 </div>
//                 )
//             }
//             { apply && (
//                 <div> Merci pour votre candidature!
//                       Multipliez vos chances de décrocher un stage en postulant à d'autres offres
//                 </div>
//              )
//             }
//             { cancel && (
//                 <div> Nous comprenons: il y a tellement d'autres offres qui vous correspondent mieux!
//                       Multipliez vos chances de décrocher un stage en postulant à d'autres offres
//                 </div>
//              )
//             }
//         </>
//     )  
// }   

// export default OfferDetails;