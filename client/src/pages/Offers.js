import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../components/AppContext';

const Offers = ()=> {
  // const user = useContext(UserContext)
  const offers = useSelector((state) => state.allOffersReducer);
  console.log(offers)

  return (
    // only to test allOffersReducer
    <ul>
      {
        offers.map((offer)=>{
          return <li key={offer._id}>{offer.position}</li>
        })
      }
    </ul>
    // <div className="offers-page">
    //     {user.type === "company"?( 
    //       <h2>Hello from Offers - select a student </h2>
    //       ):( user.type === "student" ? (
    //         <h2>Hello from Offers - apply now</h2>
    //         ):(
    //           <h2>Hello from Offers</h2>
    //           )  
            
    //       )
    //     }
    // </div> 
  );
}

export default Offers;
