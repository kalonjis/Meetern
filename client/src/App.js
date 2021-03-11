import React, { useEffect, useState} from 'react';
import Routes from './components/routes/Routes';
import { UserContext} from './components/AppContext';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({})
  const [company, setCompany] = useState({})
  const [student, setStudent] = useState({})
  useEffect(() =>{
    const fetchTokenCompany = async ()=>{
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtCompanyId`,
        withCredentials: true
      })
        .then((res)=>{
          console.log(res);
          setCompany({id: res.data, type: "company"})
          })
        .catch((err)=> console.log('No token'));
    };
    const fetchTokenStudent = async ()=>{
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtStudentId`,
        withCredentials: true
      })
        .then((res)=>{
          console.log(res);
          setStudent({id: res.data, type: "student"})          
          })
        .catch((err)=> console.log('No token'));
    };

    fetchTokenCompany();
    fetchTokenStudent();
    setUser(company.id !== null? company : (student.id !== null ? student: {})) 


    // s'il y a un uid alors on le "dispatch" dans le store en appelant getUser
    // if (uid) dispatch(getUser(uid));  
  }, [user, company, student])
  return (
    // <UidContext.Provider value={uid}>
    //   <UserTypeContext.Provider value ={utype}>
      <UserContext.Provider value={user}>
        <Routes/>
      </UserContext.Provider>
    //   </UserTypeContext.Provider>
    // </UidContext.Provider>
  );
}

export default App;
