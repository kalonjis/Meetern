import React, { useContext } from 'react';
import { UserContext } from '../components/AppContext';
import HomeCompany from '../components/home/HomeCompany';
import HomeStudent from '../components/home/HomeStudent';

function Home() {
  const user = useContext(UserContext)
  console.log(user)
  let company = false
  let student = false
  if ( user.type ==="company") {
    company = true
  }
  if ( user.type ==="student") {
    student = true
  }

  return (
  <div>
     {company ? <HomeCompany/>: (student ? <HomeStudent/>:<div>Hello! signUP man!</div>)}
  </div>
  );
}

export default Home;
