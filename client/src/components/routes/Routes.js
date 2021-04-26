import React from 'react';
import { BrowserRouter  as Router, Switch, Route, Redirect } from 'react-router-dom';
import  Home  from '../../pages/Home'
import Profil from '../../pages/Profil';
import Offers from '../../pages/Offers';
import OfferDetails from '../../pages/OfferDetails';
import Messages from '../../pages/Messages';
import Navbar from '../Navbar';

const routes = () =>{
    return (
       <Router>
           <Navbar />
           <Switch>
               <Route path="/" exact component ={Home} />
               <Route path="/profil" exact component ={Profil} />
               <Route path="/offers" exact component ={Offers} />
               <Route path="/offers/:id" exact component ={OfferDetails} />
               <Route path="/messages" exact component ={Messages} />
               <Route path="/messages/:id" exact component ={Messages} />
               <Redirect to="/" />
           </Switch>
       </Router>
    );
};

export default routes;

