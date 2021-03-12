import React, {useState} from 'react';
import CompanySignInForm from './signIN/CompanySignInForm';
import StudentSignInForm from './signIN/StudentSignInForm';
// import SignInForm from './SignInForm';
// import SignUpForm from './SignUpForm';


const Log = (props)=>{
    const [userType, setUserType] = useState('company')
    // const [signUpModal, setSignUpModal] = useState(props.signup);
    // const [signInModal, setSignInModal] = useState(props.signin);
    
    // const handleModals = (e)=>{
    //     e.preventDefault()
    //     if (e.target.id === 'register'){
    //         setSignInModal(false)
    //         setSignUpModal(true)
    //     } else if (e.target.id ==='login'){
    //         setSignInModal(true)
    //         setSignUpModal(false)
    //     }
    // }
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
                </article>
                {userType==='company' && <CompanySignInForm/>}
                {userType==='student' && <StudentSignInForm/> }
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