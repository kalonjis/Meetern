import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../components/AppContext';
import OffersCompany from '../components/offers/companyOffers/OffersCompany';

const Offers = ()=> {
  const user = useContext(UserContext)
  const offers = useSelector((state) => state.allOffersReducer);
  console.log(offers)

  return (
    <div className="offers-page">
        {user.type === "company"?( 
          <OffersCompany/>
          ):( user.type === "student" ? (
            <h2>Hello from Offers - apply now</h2>
            ):(
              <h2>Hello from Offers</h2>
              )              
          )
        }
    </div>

     
  );
}

export default Offers;
