import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllOffers } from '../actions/allOffers.actions';
import { UserContext } from '../components/AppContext';
import Chatcompany from '../components/chat/company/Chat.company';
import { BrowserRouter  as Switch, Redirect } from 'react-router-dom';


const Messages = ()=> {
    const user = useContext(UserContext)
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
            <> 
            <h2>Hello from Messages - chat with a student </h2>
            <Chatcompany />
            </>

            ):( user.type === "student" ? (
              <h2>Hello from Messages - chat with a company</h2>
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
  
  export default Messages;