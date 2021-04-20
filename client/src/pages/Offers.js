import React, { useContext } from 'react';
import { UserContext } from '../components/AppContext';
import OffersCompany from '../components/offers/companyOffers/OffersCompany/OffersCompany';
import OffersStudent from '../components/offers/studentOffers/Offer.Student/Offers.student';

const Offers = ()=> {
  const user = useContext(UserContext)

  return (
    <div className="offers-page">
        {user.type === "company"?( 
          <OffersCompany/>
          ):( user.type === "student" ? (
            <OffersStudent/>
            ):(
              <h2>Hello from Offers</h2>
              )              
          )
        }
    </div>
  )
};

export default Offers;
