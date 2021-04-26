import React, { useEffect, useState } from 'react'
import Left from './left/Left'
import Middle from './middle/Middle'
import Right from './right/Right'
import './Chat.company.css'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../../utils'

const Chatcompany = () => {
    const company = useSelector( state => state.companyReducer);
    const allOffers = useSelector( state => state.allOffersReducer);
    const [myOffers, setMyOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if (!isEmpty(allOffers)){
            setMyOffers(allOffers.filter( offer => offer.companyId === company._id))
            setIsLoading(false)
        }
    },[allOffers, company])

   
    return (
        <div className="chat-company-page">
            { isLoading && (
                <i className="fas fa-spinner fa-spin"></i>
                )
            }
            { isLoading === false && !isEmpty(myOffers) && (
                <>
                    <div className="left-part">
                        <Left myOffers={myOffers}/>
                    </div>
                    <div className="middle-part">
                        <Middle/>
                    </div>
                    <div className="right-part">
                        <Right myOffers={myOffers}/>
                    </div>
                </>
            )}
        </div>
    )
}

export default Chatcompany
