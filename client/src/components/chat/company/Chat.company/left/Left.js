import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isEmpty } from '../../../../utils';
import StudentCard2 from '../../StudentCard2';

const Left = ({myOffers}) => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [studentIdList, setStudentIdList] = useState([]);

    useEffect(()=>{
        if(!isEmpty(myOffers) && myOffers[0]){
            let likedList =[]
            myOffers.map(offer => (
                offer.applications.map(application =>{
                    if (application.status === "liked" || application.status === "selected" ){
                        return likedList.push(application.studentId)
                    }
                    else{
                        return null
                    }
                })
            ))
            setStudentIdList([...new Set (likedList)])
            setIsLoading(false)
        }
    },[myOffers])

    return (
        <div className= "company-message-page-container">
            { isLoading && (
                <i className="fas fa-spinner fa-spin"></i>
                )
            }
            { isLoading === false &&(
                <div className="hub-container">
                    <ul className="hub-student-list">
                        {
                            studentIdList.map( studentId => 
                                 ( <li key={studentId}>
                                     <Link to={`/messages/${studentId}`}><StudentCard2 id={studentId} /></Link>
                                   </li>
                                 )
                            )
                        } 
                    </ul>
                </div>
           )}
        </div>
    )
}

export default Left
