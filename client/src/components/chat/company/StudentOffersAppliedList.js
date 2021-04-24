import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { isEmpty } from '../../utils';


const StudentOffersAppliedList = ({id}) => {

    const company =  useSelector((state)=> state.companyReducer);
    const allOffers = useSelector((state)=> state.allOffersReducer);
    const [isLoading, setIsLoading] = useState(true)
    const [myOffers, setMyOffers] = useState([]);
    const [offersAppliedList, setOffersAppliedList] =useState([])


    useEffect(()=>{
        if (!isEmpty(allOffers)){
            setMyOffers(allOffers.filter( offer => offer.companyId === company._id))
            setIsLoading(false)

        }
    },[allOffers, company])

    useEffect(()=>{
        if(!isEmpty(myOffers)){
            let list =[];
            myOffers.map( offer =>(
                offer.applications.map( application =>{
                    if( application.studentId === id){
                        return list.push(offer)
                    }else {
                        return null
                    }
                })
            ))
            setOffersAppliedList(list)
        }
    }, [myOffers, id])

    return (
        <div className="student-applications-list-container" >
            { isLoading && (
                <i className="fas fa-spinner fa-spin"></i>
                )

            }
            { isLoading === false &&(
                <div>
                    <h3>Candidat pour les stages suivants:</h3>
                    <ul>
                        {
                            offersAppliedList.map( offer => (
                                <li key={offer._id}>
                                    <b> {offer.position}</b>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}

export default StudentOffersAppliedList
