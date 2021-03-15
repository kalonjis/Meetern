import React, { useState } from 'react';
// import LeftNav from '../LeftNav';
import {useDispatch, useSelector} from 'react-redux';
import UploadImg from './UploadImgCompany';
import { dateParser } from '../../utils';
import { updateCompany } from '../../../actions/company.action';
// import FollowHandler from './FollowHandler';
 
// Component sous la barre Navbar qu'on récupère dans la page '/profil' quand user est connecté
const UpdateProfil = ()=>{
    const [bio, setBio] = useState('');
    const [sector, setSector] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [phone, setPhone] = useState('');
    const [webSite, setWebSite] = useState('');
    const [corporateWear, setCorporateWear] = useState('');
    const [updateForm, setUpdateForm] = useState(false); // pour gérer l'affichage conditionnel
    const company = useSelector((state)=>state.companyReducer);// On récupère les datas dans le store
    console.log(company._id)

    // const usersData = useSelector((state)=>state.usersReducer);// On récupère les datas dans le store
    const dispatch = useDispatch() // on instancie la methode pour pouvoir l'utiliser ds le callback
    // const [followingPopup, setFollowingPopup] = useState(false);
    // const [followersPopup, setFollowersPopup] = useState(false);

    const handleUpdate=()=>{
        dispatch(updateCompany(company._id, bio, sector, companyType, phone, webSite, corporateWear)); // déclanche l'action updateBio
        setUpdateForm(false); // permet de changer l'affichage
    }

    // On affiche la LeftNav, l'uploadImg et la Bio
    return (
        <div className="profil-container">
            {/* <LeftNav/> */}
            <h1> Profil de {company.companyName}</h1>
            <div className="update-container" >
                <h3>Photo de profil</h3>
                <img src={company.picture} alt="user-pic" />
                <UploadImg />
                <div className="bio-update">
                    <h3>Bio</h3>
                    {updateForm === false && (  /*affichage conditionnel*/ 
                        <>
                            <p onClick={()=>setUpdateForm(!updateForm)} >{company.bio}</p>
                            <button onClick={()=>setUpdateForm(!updateForm)}>Modifier Bio</button>
                        </>
                    )}
                    {updateForm && (  /*affichage conditionnel*/
                        <>
                        <textarea type="text" defaultValue={company.bio} onChange={(e)=>setBio(e.target.value)}>
                        </textarea>
                        <button onClick={handleUpdate} >Valider modifications</button>  
                        </>
                    )}
                </div>
                <div className="sector-update">
                    <h3>sector</h3>
                    {updateForm === false && (  /*affichage conditionnel*/ 
                        <>
                            <p onClick={()=>setUpdateForm(!updateForm)} >{company.sector}</p>
                            <button onClick={()=>setUpdateForm(!updateForm)}>Modifier sector</button>
                        </>
                    )}
                    {updateForm && (  /*affichage conditionnel*/
                        <>
                        <textarea type="text" defaultValue={company.sector} onChange={(e)=>setSector(e.target.value)}>
                        </textarea>
                        <button onClick={handleUpdate} >Valider modifications</button>  
                        </>
                    )}
                </div>
                
                <div className="companyType">
                    <h3>companyType</h3>
                    {updateForm === false && (  /*affichage conditionnel*/ 
                        <>
                            <p onClick={()=>setUpdateForm(!updateForm)} >{company.companyType}</p>
                            <button onClick={()=>setUpdateForm(!updateForm)}>Modifier companyType</button>
                        </>
                    )}
                    {updateForm && (  /*affichage conditionnel*/
                        <>
                        <textarea type="text" defaultValue={company.companyType} onChange={(e)=>setCompanyType(e.target.value)}>
                        </textarea>
                        <button onClick={handleUpdate} >Valider modifications</button>  
                        </>
                    )}
                </div>
                <div className="phone">
                    <h3>phone</h3>
                    {updateForm === false && (  /*affichage conditionnel*/ 
                        <>
                            <p onClick={()=>setUpdateForm(!updateForm)} >{company.phone}</p>
                            <button onClick={()=>setUpdateForm(!updateForm)}>Modifier phone</button>
                        </>
                    )}
                    {updateForm && (  /*affichage conditionnel*/
                        <>
                        <textarea type="text" defaultValue={company.phone} onChange={(e)=>setPhone(e.target.value)}>
                        </textarea>
                        <button onClick={handleUpdate} >Valider modifications</button>  
                        </>
                    )}
                </div>
                <div className="webSite">
                    <h3>webSite</h3>
                    {updateForm === false && (  /*affichage conditionnel*/ 
                        <>
                            <p onClick={()=>setUpdateForm(!updateForm)} >{company.webSite}</p>
                            <button onClick={()=>setUpdateForm(!updateForm)}>Modifier webSite</button>
                        </>
                    )}
                    {updateForm && (  /*affichage conditionnel*/
                        <>
                        <textarea type="text" defaultValue={company.webSite} onChange={(e)=>setWebSite(e.target.value)}>
                        </textarea>
                        <button onClick={handleUpdate} >Valider modifications</button>  
                        </>
                    )}
                </div>
                <div className="phone">
                    <h3>corporateWear</h3>
                    {updateForm === false && (  /*affichage conditionnel*/ 
                        <>
                            <p onClick={()=>setUpdateForm(!updateForm)} >{company.corporateWear}</p>
                            <button onClick={()=>setUpdateForm(!updateForm)}>Modifier corporateWear</button>
                        </>
                    )}
                    {updateForm && (  /*affichage conditionnel*/
                        <>
                        <textarea type="text" defaultValue={company.corporateWear} onChange={(e)=>setCorporateWear(e.target.value)}>
                        </textarea>
                        <button onClick={handleUpdate} >Valider modifications</button>  
                        </>
                    )}
                </div>
                <h4>Membre depuis le : {dateParser(company.createdAt)/* date de la db formatée */}</h4>
            </div>
        </div> 
        // {/* //         <div className="right-part">
        // //             <h5 onClick={()=>setFollowingPopup(true)}> 
        // //                 Abonnements {userData.following? userData.following.length:""/*Il faut mettre une ternaire sinon affiche erreur*/}
        // //             </h5>
        // //             <h5 onClick={()=>setFollowersPopup(true)}>
        // //                 Abonnés {userData.followers? userData.followers.length:""}
        // //             </h5>
        // //         </div>
        // //     </div>
        // //     { followingPopup && (
        // //         <div className="popup-profil-container">
        // //             <div className="modal">
        // //                 <h3>Abonnements</h3>
        // //                 <span className="cross" onClick={()=> setFollowingPopup(false)}>&#10005;</span>
        // //                 <ul>
        // //                     {usersData.map((user) => {
        // //                             for (let i = 0; i < userData.following.length; i++) {
        // //                                 if (user._id === userData.following[i]){
        // //                                     return (
        // //                                         <li key={user._id}>
        // //                                             <img src={user.picture} alt="user-pic"/>
        // //                                             <h4>{user.pseudo}</h4>
        // //                                             <div className="follow-handler">
        // //                                                 <FollowHandler idToFollow={user._id} type={'suggestion'}/>
        // //                                             </div>
        // //                                         </li>
        // //                                     )
        // //                                 }  
        // //                             }return null // ça fct sans mais alors il afiche une err ds la console
        // //                         })
        // //                     }
        // //                 </ul>
        // //             </div>
        // //         </div>)
        // //     }
        // //     { followersPopup && (
        // //         <div className="popup-profil-container">
        // //             <div className="modal">
        // //                 <h3>Abonnés</h3>
        // //                 <span className="cross" onClick={()=> setFollowersPopup(false)}>&#10005;</span>
        // //                 <ul>
        // //                     {usersData.map((user) => {
        // //                             for (let i = 0; i < userData.followers.length; i++) {
        // //                                 if (user._id === userData.followers[i]){
        // //                                     return (
        // //                                         <li key={user._id}>
        // //                                         <img src={user.picture} alt="user-pic"/>
        // //                                         <h4>{user.pseudo}</h4>
        // //                                         <div className="follow-handler">
        // //                                             <FollowHandler idToFollow={user._id} type={'suggestion'}/>
        // //                                         </div>
        // //                                         </li>
        // //                                     )
        // //                                 }  
        // //                             }return null //ça fct sans mais alors il afiche une err ds la console
        // //                         })
        // //                     }                            
        // //                 </ul>
        // //             </div>
        // //         </div>)
        // //     } */}
        // </div>
        
    )
}
export default UpdateProfil;