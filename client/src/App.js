import React, { useEffect, useState} from 'react';
import Routes from './components/routes/Routes';
import {UidContext, UserTypeContext} from './components/AppContext';
import axios from 'axios';

function App() {
  const [uid, setUid] = useState(null);
  const [utype, setUtype] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  // const dispatch = useDispatch(); //permet de déclancher une action - On stocke la methode dans une const pour  pouvoir l'appeler dans le callback

  useEffect(() =>{
    const fetchTokenCompany = async ()=>{
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtCompanyId`,
        withCredentials: true
      })
        .then((res)=>{
          console.log(res);
          setCompanyId(res.data)
          setUtype('company');
          
          })
        .catch((err)=> console.log('No token'));
    };
    const fetchTokenStudent = async ()=>{
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtStudentId`,
        withCredentials: true
      })
        .then((res)=>{
          console.log(res);
          setStudentId(res.data);
          setUtype('student')
          
          })
        .catch((err)=> console.log('No token'));
    };

    fetchTokenCompany();
    fetchTokenStudent();
    setUid(companyId !== null? companyId:(studentId !== null ? studentId: null)) 


    // s'il y a un uid alors on le "dispatch" dans le store en appelant getUser
    // if (uid) dispatch(getUser(uid));  
  }, [uid, utype, companyId, studentId])
  return (
    <UidContext.Provider value={uid}>
      <UserTypeContext.Provider value ={utype}>
        <Routes/>
      </UserTypeContext.Provider>
    </UidContext.Provider>
  );
}

export default App;
