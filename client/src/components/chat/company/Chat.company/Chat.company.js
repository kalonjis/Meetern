import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux';
import StudentCard2 from '../StudentCard2';
import StudentCard from '../../../offers/companyOffers/StudentCard';
import StudentOffersAppliedList from '../StudentOffersAppliedList';
import './Chat.company.css'


 const Chatcompany = () =>{
    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const [isLoading, setIsLoading] = useState(true)
    const [myOffers, setMyOffers] = useState([]);
    const [studentIdList, setStudentIdList] = useState([]);
    const [studentIdInfo, setStudentIdInfo] = useState(null)
    
    useEffect(()=>{
        if (allOffers[0]){
            setMyOffers(allOffers.filter((offer)=> (offer.companyId === company._id)))
            setIsLoading(false)
        }
    }, [company, allOffers]);

    useEffect(()=>{
        if(myOffers[0]){
            let likedList =[]
            myOffers.map(offer => (
                offer.applications.map(application =>{
                    if (application.status === "liked"){
                        return likedList.push(application.studentId)
                    }
                    else{
                        return null
                    }
                })
            ))
            setStudentIdList([...new Set (likedList)])
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
                                 ( <li key={studentId} onClick={ e => setStudentIdInfo(studentId) }>
                                     <StudentCard2 id={studentId} />
                                    </li>
                                 )
                            )
                        } 
                    </ul>
                    <div className="hub-student-info-container">
                        { studentIdInfo === null ? ( 
                                <div> Select a student in the list </div>
                            ):(
                                <div> 
                                    <StudentCard id={studentIdInfo}/>
                                    <StudentOffersAppliedList id={studentIdInfo} />
                                </div>
                            )
                        }
                    </div>
                </div>
           )}
        </div>
    )
}
export default Chatcompany
