import React, { useContext } from 'react';
import { UserContext } from '../components/AppContext';

const Offers = ()=> {
  const user = useContext(UserContext)

  return (
    <div className="offers-page">
        {user.type === "company"?( 
          <h2>Hello from Offers - select a student </h2>
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
