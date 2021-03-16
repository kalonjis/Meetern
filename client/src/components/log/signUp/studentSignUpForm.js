import React, { useState } from 'react';
import axios from 'axios';
import StudentSignInForm from '../signIN/StudentSignInForm';

const StudentSignUpForm = () => {

    const [formSubmit, setFormSubmit] = useState(false); //firstname, lastname
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) =>{
        e.preventDefault();

        const terms = document.getElementById('terms');
        const firstnameError = document.querySelector('.firstname.error');
        const lastnameError = document.querySelector('.lastname.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');

        termsError.innerHTML ='';
        passwordConfirmError.innerHTML=''

        if(!terms.checked || password !== controlPassword){
            if (!terms.checked){
                termsError.innerHTML= 'Veuillez valider les conditions générales'
            }
            if (password !== controlPassword){
                passwordConfirmError.innerHTML= 'Les mots de passes ne correspondent pas'
            }
        } else {
            await axios({
                method: "post",
                url:`${process.env.REACT_APP_API_URL}api/student/register`,
                withCredentials: true,
                data: {
                    firstname,
                    lastname,
                    email,
                    password,
                }
            }) 
            .then((res)=>{
                console.log(res)
                if(res.data.errors) {
                    firstnameError.innerHTML = res.data.errors.firstname;
                    lastnameError.innerHTML = res.data.errors.lastname;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;

                } else{
                    // 
                    setFormSubmit(true)
                    res.status(200)
                    console.log(res)
                }
            })
            .catch((err) =>{
                console.log(err)
            });        
        };
    };


   
    return (
        <>
            {formSubmit ? (
                <>
                <StudentSignInForm />
                <span></span>
                <h4 className='success'>Enregistrement réussi, veuillez vous connecter</h4>
                </>
            ) : ( 
                <form action="" onSubmit={handleRegister} id="sign-up-form" >
                <label htmlFor="firstname">Firstname</label>
                <br/>
                <input 
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={(e)=>setfirstname(e.target.value)}
                        value={firstname}>
                </input>
                <br/>
                <div className="firstname error"></div>
                <br/>
                <label htmlFor="lastname">Lastname</label>
                <br/>
                <input 
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={(e)=>setlastname(e.target.value)}
                        value={lastname}>
                </input>
                <br/>
                <div className="lastname error"></div>
                <br/>
                <label htmlFor="email">Email</label>
                <br/>
                <input 
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}>
                </input>
                <br/>
                <div className="email error"></div>
                <br/>
                <label htmlFor="password">Password</label>
                <br/>
                <input 
                        type="password"
                        className="password"
                        id="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}>
                </input>
                <br/>
                <div className="password error"></div>
                <br/>
                <label htmlFor="password-conf"> Confirm password</label>
                <br/>
                <input 
                        type="password"
                        name="controlPassword"
                        id="password-conf"
                        onChange={(e)=>setControlPassword(e.target.value)}
                        value={controlPassword}>
                </input>
                <br/>
                <div className="password-confirm error"></div>
                <br/>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
                <div className="terms error"></div>
                <input type="submit" value="Valider inscription"></input>
                </form>
                )
            }
        </>
    )
};
export default StudentSignUpForm;
