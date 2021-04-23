import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllOffers } from '../actions/allOffers.actions';
import { UserContext } from '../components/AppContext';
import OffersCompany from '../components/offers/companyOffers/OffersCompany/OffersCompany';
import OffersStudent from '../components/offers/studentOffers/Offer.Student/Offers.student';
import { BrowserRouter  as Switch, Redirect } from 'react-router-dom';



const Offers = ()=> {
  const user = useContext(UserContext);
  const [fetchData, setFetchData] = useState(true);
  const dispatch = useDispatch();
  
  const fetchOffers = async()=>{
    await dispatch(getAllOffers())
    setFetchData(false)
    console.log('offers refreshed')
  }

  useEffect(()=>{
    if(fetchData){
      fetchOffers()
    }
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
