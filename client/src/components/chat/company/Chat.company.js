import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux';
import StudentCard from './StudentCard';


 const Chatcompany = () =>{
    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const [myOffers, setMyOffers] = useState([]);
    const [studentIdList, setStudentIdList] = useState([]);
    
    useEffect(()=>{
        if (allOffers[0]){
            setMyOffers(allOffers.filter((offer)=> (offer.companyId === company._id)))
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
    console.log(studentIdList)

    return (
        <div>
            contact a student!
           <ul>
              {
                  studentIdList.map( studentId => {
                    return <StudentCard id={studentId}/>
                  })
              } 
           </ul>
        </div>
    )
}
export default Chatcompany
