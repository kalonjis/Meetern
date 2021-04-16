import React, { useContext } from 'react';
import { UserContext } from '../components/AppContext';
import Chatcompany from '../components/chat/company/Chat.company';

const Messages = ()=> {
    const user = useContext(UserContext)
  
    return (
      <div className="offers-page">
          {user.type === "company"?(
            <> 
            <h2>Hello from Messages - chat with a student </h2>
            <Chatcompany />
            </>

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