import React, { useEffect } from 'react'
import { isEmpty} from '../../../../utils';
import StudentCard from '../../../../offers/companyOffers/StudentCard';
import StudentOffersAppliedList from './appliedList/StudentOffersAppliedList';
import { useParams } from 'react-router';

import './Right.css'

const Right = ({myOffers}) => {
    const {id} = useParams()

    useEffect(()=>{
        if(id)
        console.log("Rigth : studentId : "+ id)
    },[id])
    
       return (
        <div className="student-hub-container" >
            { isEmpty(id) && (
                <div className="empty-message"> Select a student in the list</div>
                )
            }
            { !isEmpty(myOffers) && !isEmpty(id) &&(
                <div >
                    <StudentCard id={id} />
                    <StudentOffersAppliedList id={id} myOffers={myOffers}/>
                </div>
            )}
        </div>
    )
}

export default Right
