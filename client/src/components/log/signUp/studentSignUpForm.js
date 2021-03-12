import React, { useState } from 'react';
import axios from 'axios';
import StudentSignInForm from '../signIN/StudentSignInForm';

const StudentSignUpForm = () => {

    const [formSubmit, setFormSubmit] = useState(false); //studentFirstname, studentLastname
    const [studentFirstname, setStudentFirstname] = useState('');
    const [studentLastname, setStudentLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) =>{
        e.preventDefault();

        const terms = document.getElementById('terms');
        const studentFirstnameError = document.querySelector('.studentFirstname.error');
        const studentLastnameError = document.querySelector('.studentLastname.error');
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
                    studentFirstname,
                    studentLastname,
                    email,
                    password,
                }
            }) 
            .then((res)=>{
                console.log(res)
                if(res.data.errors) {
                    studentFirstnameError.innerHTML = res.data.errors.studentFirstname;
                    studentLastnameError.innerHTML = res.data.errors.studentLastname;
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
                <label htmlFor="studentFirstname">Firstname</label>
                <br/>
                <input 
                        type="text"
                        name="studentFirstname"
                        id="studentFirstname"
                        onChange={(e)=>setStudentFirstname(e.target.value)}
                        value={studentFirstname}>
                </input>
                <br/>
                <div className="studentFirstname error"></div>
                <br/>
                <label htmlFor="studentLastname">Lastname</label>
                <br/>
                <input 
                        type="text"
                        name="studentLastname"
                        id="studentLastname"
                        onChange={(e)=>setStudentLastname(e.target.value)}
                        value={studentLastname}>
                </input>
                <br/>
                <div className="studentLastname error"></div>
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
