import React, { useEffect, useState} from 'react';
import Routes from './components/routes/Routes';
import { UserContext} from './components/AppContext';
import axios from 'axios';

function App() {
  const [uid, setUid] = useState(null);
  const [user, setUser]= useState({})
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
    // if (uid) dispatch(getUser(uid));  
    if (uid) setUser({id: uid, type: "student"})// pour tester mais il faudra changer cela par : dispatch(getUser(uid)) ensuite     const userData = useSelector((state)=>state.userReducer); ensuite setUser({id:uid, type: userData.userType})

  }, [uid])
  
  return (
    
      <UserContext.Provider value={user}>
        <Routes/>
      </UserContext.Provider>
 
  );
}

export default App;
