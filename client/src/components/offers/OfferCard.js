import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../utils';


const OfferCard = ({offer}) => {
    const allStudents = useSelector( state => state.allStudentsReducer)
    const [student, setStudent] = useState(null)
    
    useEffect(()=>{
        if( !isEmpty(offer.companyChoice) && allStudents[0]){
            setStudent( allStudents.filter( student => student._id === offer.companyChoice)[0])
        }
    }, [offer.companyChoice, allStudents])
    
    return (
        <div className= "offerCard-container">
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
                <p> Selected student:{ student === null ? " No one preselected" : ` ${student.firstname} ${student.lastname}`}</p>
            </div>
        </div>
    )
}

export default OfferCard
