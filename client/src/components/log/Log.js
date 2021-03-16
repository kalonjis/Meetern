import React, {useState} from 'react';
import CompanySignInForm from './signIN/CompanySignInForm';
import CompanySignUpForm from './signUp/CompanySignUpForm';
import StudentSignInForm from './signIN/StudentSignInForm';
import StudentSignUpForm from './signUp/StudentSignUpForm';



const Log = ()=>{
    const [userType, setUserType] = useState('company');
    const [actionType, setActionType]= useState('signUP')
    
    const handleUserType = (e) =>{
        e.preventDefault();
        if (e.target.id ==='company'){
            setUserType('company')
            console.log('company')
        }else if (e.target.id === 'student'){
            setUserType('student')
            console.log('student')

        }
    }

    const handleAction = (e)=>{
        e.preventDefault();
        if (e.target.id ==='signIn'){
            setActionType('signIn')
        }else if(e.target.id === 'signUp'){
            setActionType('signUp')
        }
    }

    return (
        <section className= "connection-form">
                <article className = "selection-userType">
                    <h1>Je suis un(e) </h1>
                    <button id='company' onClick ={handleUserType}>
                        Entreprise
                    </button>
                    <button id='student' onClick={handleUserType}>
                        Etudiant
                    </button>
                    <h4 style={{color: 'blue'}} >{userType}</h4>
                </article>
                <article className = "selection-userAction">
                    <h1>Je veux </h1>
                    <button id='signIn' onClick ={handleAction}>
                        Me connecter
                    </button>
                    <button id='signUp' onClick={handleAction}>
                        M'enregistrer
                    </button>
                    <h4 style={{color: 'blue'}} >{actionType}</h4>
                </article>
                {userType==='company' && actionType === 'signIn' && <CompanySignInForm/>}
                {userType==='company' && actionType === 'signUp' && <CompanySignUpForm />}
                {userType==='student' && actionType === 'signIn' && <StudentSignInForm/> }
                {userType==='student' && actionType === 'signUp' && <StudentSignUpForm /> }
            {/* <article className="form-container">
                <ul>
                    <li onClick ={handleModals} id='register' className={signUpModal? "active-btn":null}> S'incrire </li>
                    <li onClick ={handleModals} id='login' className={signInModal? "active-btn":null}> Se connecter </li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />} */}
            {/* </article> */}
        </section>
    );
};

export default Log;