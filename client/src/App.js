import React, { useEffect, useState} from 'react';
import Routes from './components/routes/Routes';
import { UserContext} from './components/AppContext';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { getStudent } from './actions/student.action';
import { getCompany } from './actions/company.action'
import { getStudentApplicationsList } from './actions/applicationsList.action';


function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch(); //permet de déclancher une action - On stocke la methode dans une const pour  pouvoir l'appeler dans le callback
  
  useEffect(() =>{
    const fetchToken = async ()=>{
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
      .then((res)=>{
        console.log(res);
        setUid(res.data);
      })
      .catch((err)=> console.log('No token'));
    };
    
    fetchToken();
    
    // s'il y a un uid alors on le "dispatch" dans le store en appelant getUser
    // if (uid)   
    if (uid) {
      dispatch(getStudent(uid));
      dispatch(getCompany(uid))
    }// pour tester mais il faudra changer cela par : dispatch(getUser(uid)) ensuite     const userData = useSelector((state)=>state.userReducer); ensuite setUser({id:uid, type: userData.userType}) 
  }, [uid, dispatch])

  const company = useSelector((state) => state.companyReducer);
  console.log(company)
  const student = useSelector((state)=> state.studentReducer);
  console.log(student)
  let user = {}
  if (company){
    user = {id: company._id, type:company.userType}
  }else if (student){
    user = {id: student._id, type:student.userType}
    dispatch(getStudentApplicationsList(user.id))      

  }
  return (
    
      <UserContext.Provider value={user}>
        <Routes/>
      </UserContext.Provider>
 
  );
}

export default App;
