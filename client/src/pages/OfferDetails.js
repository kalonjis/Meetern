import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/AppContext';
import OfferDetailsCompany from '../components/offers/companyOffers/Company.OfferDetails/Company.OfferDetails';
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOffer } from '../actions/offer.action';
import OfferDetailsStudent from '../components/offers/studentOffers/Student.OfferDetails/Student.OfferDetails';
import { getAllStudents } from '../actions/allStudents.actions'

const OfferDetails = () => {
    const user = useContext(UserContext)
    const {id} = useParams()
    const [fetchStudents, setFetchStudents] = useState(true)
    const dispatch = useDispatch()
    dispatch(getOffer(id))
    
    const fetchAllStudents = async()=>{
      await dispatch(getAllStudents());
      setFetchStudents(false)
      console.log('student refreshed')
    }

    useEffect(()=>{
      if(fetchStudents){
        fetchAllStudents()
      }
    })
    
    console.log(user)
    return (
      <div className="offerDetail-page">
        { fetchStudents &&(
          <div> Fetching Datas</div>
          )
        }
        { fetchStudents === false &&(
          <>
            {user.type === "company"?( 
              <OfferDetailsCompany/>
            ):( user.type === "student" ? (
                <OfferDetailsStudent />
                ):(
                <h2>Hello from Offers</h2>
                )                 
            )
            }
          </>
          )
        }
      </div>
    ); 
}

export default OfferDetails
