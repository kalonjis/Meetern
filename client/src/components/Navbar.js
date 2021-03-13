import React, { useContext } from 'react';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserContext } from './AppContext';
import LogoutCompany from './log/Logout/LogoutCompany';
import LogoutStudent from './log/Logout/LogoutStudent';

//component qui s'affiche en haut de l'écran sur toutes les pages

const Navbar = ()=>{
    const user = useContext(UserContext) ; //On récupère l'"uid" 
    
    // const userData = useSelector((state)=>state.userReducer) // "useSelector" permet de récuper les datas dans le store

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
                            <li className="welcome">
                                <NavLink exact to='/profil'>
                                    <h5>Bienvenue Company</h5>
                                </NavLink>
                            </li>
                            <LogoutCompany />
                        </ul>):(
                         <ul>
                            <li></li>
                            <li className="welcome">
                                <NavLink exact to='/profil'>
                                    <h5>Bienvenue Student</h5>
                                </NavLink>
                            </li>
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