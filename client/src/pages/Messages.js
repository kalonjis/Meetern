import React, { useContext } from 'react';
import { UserContext } from '../components/AppContext';

const Messages = ()=> {
    const user = useContext(UserContext)
  
    return (
      <div className="offers-page">
          {user.type === "company"?( 
            <h2>Hello from Messages - chat with a student </h2>
            ):( user.type === "student" ? (
              <h2>Hello from Messages - chat with a company</h2>
              ):(
                <h2>Hello from Messages</h2>
                )  
              
            )
          }
      </div> 
    );
  }
  
  export default Messages;