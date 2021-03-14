import React, { useContext } from 'react';
import { UserContext} from '../components/AppContext';
import Log from '../components/log/Log';
import UpdateProfil from '../components/profil/companyProfile/UpdateProfil';
// import UpdateProfil from '../components/Profil/UpdateProfil';


/**Profil page component adress:.../profil  */


const Profil = () =>{
    const user = useContext(UserContext);// on recupère l'id (s'il existe!) stockée dans le "UidContext.Provider" qui englobe le "<Routes/>" component (voir App.js)
    // user.type = "student"
    // renvoie un affichage conditionnel: si uid=> "updateProfil" comp. sinon=> "Log" comp. (formulaire signUpForm(par défaut)/signIN)
    return (
        <div className="profil-page">
            {user.type === "company"?(
              <div>
                <h2>Update Profil Company</h2>
                <UpdateProfil/>
              </div> 
              ):( user.type === "student" ? (
                    <h2>Update Profil Student</h2>
                  ):(
                    <Log/>
                  )  
                )
            }
        </div>
    );
};

export default Profil;

