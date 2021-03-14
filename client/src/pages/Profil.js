import React, { useContext } from 'react';
import { UserContext} from '../components/AppContext';
import Log from '../components/log/Log';
import UpdateProfileCompany from '../components/profil/companyProfile/UpdateProfileCompany';
import UpdateProfileStudent from '../components/profil/studentProfile/UpdateProfileStudent';
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
                <UpdateProfileCompany/>
              </div> 
              ):( user.type === "student" ? (
                  <div>
                    <h2>Update Profil Student</h2>
                    <UpdateProfileStudent />

                  </div>
                  ):(
                    <Log/>
                  )  
                )
            }
        </div>
    );
};

export default Profil;

