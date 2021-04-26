import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../../../../../utils';


const OfferCard2 = () => {
    const offer = useSelector( state => state.offerReducer)
    const allStudents = useSelector( state => state.allStudentsReducer)
    // const [student, setStudent] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        if( !isEmpty(offer) && allStudents[0]){
            setIsLoading(false)
        }
    }, [offer, allStudents])
    
    // useEffect(()=>{
    //     if(!isEmpty(offer) && !isEmpty(offer.companyChoice) && allStudents[0]){
    //         setStudent( allStudents.filter( student => student._id === offer.companyChoice)[0])
    //     }
    // }, [offer, allStudents])
    
    return (
        <div className= "offerCard-container">
            { isLoading && (
                <i className="fas fa-spinner fa-spin"></i>
                )
            }
            {  isLoading === false &&(
                <>
                    <h1>{offer.position} <span className="offerCard-offer-status">{offer.status}</span>
                    </h1>
                    <div className="offerCard-details">
                        <p>Description :  {offer.description} </p>
                        <p>Hiring possibility :  {offer.hiringPossibility} </p>
                        <p>Starting date :  {offer.internshipStart} </p>
                        <p> Duration :  {offer.internshipDuration} </p>
                        <p>Place :  {offer.internshipPlace} </p>
                        <p>Face to face : {offer.faceToface} </p>
                        <p> Online since : { timestampParser(offer.createdAt)}</p>
                        <p> Selected student : { isEmpty(offer.companyChoice) ? (
                            " No one preselected"
                            ) : (
                                allStudents.filter( student => student._id === offer.companyChoice)[0].firstname + " " +
                                allStudents.filter( student => student._id === offer.companyChoice)[0].lastname
                                ) 
                            }
                        </p>
                    </div>
                </>
                )
            }
        </div>
    )
}

export default OfferCard2
