import React, { useContext, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getAllOffers } from '../actions/allOffers.actions';
import { UserContext } from '../components/AppContext';
import OffersCompany from '../components/offers/companyOffers/OffersCompany/OffersCompany';
import OffersStudent from '../components/offers/studentOffers/Offer.Student/Offers.student';
import { BrowserRouter  as Switch, Redirect } from 'react-router-dom';



const Offers = ()=> {
  const user = useContext(UserContext);
  const dispatch = useDispatch();
    
  useEffect(()=>{
    dispatch(getAllOffers())
    console.log('offers refreshed')
  })

  return (
    <div className="offers-page">
        {user.type === "company"?( 
          <OffersCompany/>
          ):( user.type === "student" ? (
            <OffersStudent/>
            ):(
              <Switch>
                <Redirect to="/" />
              </Switch>
              )              
          )
        }
    </div>
  )
};

export default Offers;
