import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserContext } from './AppContext';
import LogoutCompany from './log/Logout/LogoutCompany';
import LogoutStudent from './log/Logout/LogoutStudent';

//component qui s'affiche en haut de l'écran sur toutes les pages

const Navbar = ()=>{
    const user = useContext(UserContext) ; //On récupère l'"uid" 
    const company = useSelector((state) => state.companyReducer);
    const student = useSelector((state)=> state.studentReducer);

    //On va gérer l'affichage en fonction de l'etat de la connexion (s'il y a un uid)
    return (
        <nav>
            <div className ='nav-container'>
                <div className='logo'>
                    <NavLink exact to='/'>
                        <div className='logo'>
                            <img src='../img/icon.png' alt='icon of ratoon' />
                            <h3>Meetern</h3>
                        </div>
                    </NavLink>
                </div>
                {user.id ? (
                    user.type === "company"?  (
                        <ul>
                            <li></li>
                            <li className="welcome-company">
                                <NavLink exact to='/profil'>
                                    <h5>Bienvenue {company.companyName}</h5>
                                </NavLink>
                            </li>
                            <li></li>
                            <li className="offers-company">
                                <NavLink exact to='/offers'>
                                    <h5>offers Company</h5>
                                </NavLink>
                            </li>
                            <li></li>
                            <li className="messages-company">
                                <NavLink exact to='/messages'>
                                    <h5>messages Company</h5>
                                </NavLink>
                            </li>
                            <li></li>
                            <LogoutCompany />
                        </ul>):(
                         <ul>
                            <li></li>
                            <li className="welcome-student">
                                <NavLink exact to='/profil'>
                                    <h5>Bienvenue {student.firstname}</h5>
                                </NavLink>
                            </li>
                            <li></li>
                            <li className="offers-student">
                                <NavLink exact to='/offers'>
                                    <h5>offers Student</h5>
                                </NavLink>
                            </li>
                            <li></li>
                            <li className="messages-student">
                                <NavLink exact to='/messages'>
                                    <h5>messages Company</h5>
                                </NavLink>
                            </li>
                            <li></li>
                            <LogoutStudent />
                        </ul>   
                        )
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to='/profil'>
                                <img src="../img/icons/login.svg" alt='login'/>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}
export default Navbar