import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../components/AppContext';
import HomeCompany from '../components/home/HomeCompany';
import HomeStudent from '../components/home/HomeStudent';
// import Profil from './Profil'

const Home = () => {
  const user = useContext(UserContext)
 
  return (
    <div className="home-page">
        {user.type === "company"?( 
          <HomeCompany/>
          ):( user.type === "student" ? (
                <HomeStudent/>
            ):(
              <div>
                <h1> Welcome on Meetern! </h1>
                <Link to="/profil">join us now!</Link>
              </div>
            )  
          )
        }
    </div>  
  );
}

export default Home;
