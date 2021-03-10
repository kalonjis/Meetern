import React, { useContext } from 'react';
import { UserTypeContext } from '../components/AppContext';
import HomeComp from '../components/HomeComp';
import HomeStudent from '../components/HomeStudent';



function Home() {
  const utype= useContext(UserTypeContext)
  let company = false
  let student = true
  if (utype ==="company") {
    company = true
  }
  if (utype ==="student") {
    student = true
  }

  return (
  <div>
     {company ? <HomeComp/>: (student ? <HomeStudent/>:<div>Hello! signUP man!</div>)}
  </div>
  );
}

export default Home;
