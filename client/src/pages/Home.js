import React, { useContext } from 'react';
import { UserContext } from '../components/AppContext';
import HomeCompany from '../components/home/HomeCompany';
import HomeStudent from '../components/home/HomeStudent';

const Home = () => {
  const user = useContext(UserContext)
 
  return (
    <div className="home-page">
        {user.type === "company"?( 
          <HomeCompany/>
          ):( user.type === "student" ? (
                <HomeStudent/>
            ):(
              <div>Hello! signUP man!</div>
            )  
          )
        }
    </div>  
  );
}

export default Home;
