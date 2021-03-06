import React, { useContext } from 'react';
import { UserContext } from '../components/AppContext';
import OfferDetailsCompany from '../components/offers/companyOffers/Company.OfferDetails/Company.OfferDetails';
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOffer } from '../actions/offer.action';
import OfferDetailsStudent from '../components/offers/studentOffers/Student.OfferDetails/Student.OfferDetails';
import { BrowserRouter  as Switch, Redirect } from 'react-router-dom';



const OfferDetails = () => {
    const user = useContext(UserContext)
    const {id} = useParams()
    const dispatch = useDispatch()
    dispatch(getOffer(id))
    
    console.log(user)
    return (
      <div className="offerDetail-page">
            { user.type === "company"?( 
                <OfferDetailsCompany/>
              ):( user.type === "student" ? (
                  <OfferDetailsStudent />
                ):(
                  <Switch>
                    <Redirect to="/" />
                  </Switch>
                )                 
              )
            }
      </div>
    ); 
}

export default OfferDetails
