import React, { useState } from 'react';
// import LeftNav from '../LeftNav';
import {useDispatch, useSelector} from 'react-redux';
import UploadImg from './UploadImgCompany';
import { dateParser } from '../../utils';
import { updateCompany } from '../../../actions/company.action';
// import FollowHandler from './FollowHandler';
 
// Component sous la barre Navbar qu'on récupère dans la page '/profil' quand user est connecté
const UpdateProfil = ()=>{
    const company = useSelector((state)=>state.companyReducer);// On récupère les datas dans le store
    const [bio, setBio] = useState(company.bio);
    const [sector, setSector] = useState(company.sector);
    const [companyType, setCompanyType] = useState(company.companyType);
    const [phone, setPhone] = useState(company.phone);
    const [webSite, setWebSite] = useState(company.webSite);
    const [corporateWear, setCorporateWear] = useState(company.corporateWear);
    const [updateBio, setUpdateBio] = useState(true); // pour gérer l'affichage conditionnel
    const [updateSector, setUpdateSector] = useState(true); 
    const [updateCompanyType, setUpdateCompanyType] = useState(true); 
    const [updatePhone, setUpdatePhone] = useState(true); 
    const [updateWebSite, setUpdateWebSite] = useState(true); 
    const [updateCorporateWear, setUpdateCorporateWear] = useState(true); 

    const dispatch = useDispatch() // on instancie la methode pour pouvoir l'utiliser ds le callback

    const handleUpdate=(e)=>{
        // e.preventDefault();
        dispatch(updateCompany(company._id, bio, sector, companyType, phone, webSite, corporateWear)); // déclanche l'action updateBio
        // setUpdateBio(false)
        // setUpdateSector(false)
        // setUpdateCompanyType(false)
        // setUpdatePhone(false)
        // setUpdateWebSite(false)
        // setUpdateCorporateWear(false)
        // setUpdateForm(false)
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
                <br/>

                <h2>About your company</h2>
                <form action="" onSubmit={handleUpdate} id="company-update-form">
                    <label htmlFor="bio" >Bio </label>
                    { updateBio === false &&(
                        <p onClick={(e)=>setUpdateBio(true)}>{company.bio}</p>
                     )}
                    { updateBio && ( 
                        <input
                            type="text"
                            name="bio"
                            id="bio"
                            onChange={(e)=> setBio(e.target.value)}
                            defaultValue={company.bio}
                        />)
                    }

                    <br/><br/>
                    <label htmlFor="sector" >sector </label>
                    { updateSector === false &&(
                        <p onClick={(e)=>setUpdateSector(true)}>{company.sector}</p>
                     )}
                     { updateSector && ( 
                        <input
                            type="text"
                            name="sector"
                            id="sector"
                            onChange={(e)=> setSector(e.target.value)}
                            defaultValue={company.sector}                      
                        />)
                     }
                    <br/>
                    <br/><br/>

                    <label htmlFor="companyType" >companyType </label>
                    { updateCompanyType === false &&(
                        <p onClick={(e)=>setUpdateCompanyType(true)}>{company.companyType}</p>
                     )}
                     { updateCompanyType && (
                         <input
                             type="text"
                             name="companyType"
                             id="companyType"
                             onChange={(e)=> setCompanyType(e.target.value)}
                             defaultValue={company.companyType}
                         />

                     )}
                    <br/>
                    <br/><br/>
                    <label htmlFor="phone" >phone </label>
                    { updatePhone === false &&(
                        <p onClick={(e)=>setUpdatePhone(true)}>{company.phone}</p>
                     )}
                     { updatePhone && (
                         <input
                             type="text"
                             name="phone"
                             id="phone"
                             onChange={(e)=> setPhone(e.target.value)}
                             defaultValue={company.phone}
                         />

                     )}
                    <br/>
                    <br/><br/>
                    <label htmlFor="webSite" >webSite </label>
                    { updateWebSite === false &&(
                        <p onClick={(e)=>setUpdateWebSite(true)}>{company.webSite}</p>
                     )}
                     { updateWebSite && (
                         <input
                             type="text"
                             name="webSite"
                             id="webSite"
                             onChange={(e)=> setWebSite(e.target.value)}
                             defaultValue={company.webSite}
                         />

                     )}
                    <br/>
                    <br/><br/>
                    <label htmlFor="corporateWear" >corporateWear </label>
                    { updateCorporateWear === false &&(
                        <p onClick={(e)=>setUpdateCorporateWear(true)}>{company.corporateWear}</p>
                     )}
                     { updateCorporateWear && (
                         <input
                             type="text"
                             name="corporateWear"
                             id="corporateWear"
                             onChange={(e)=> setCorporateWear(e.target.value)}
                             defaultValue={company.corporateWear}
                         />
                     )}
                    <br/>
                    <br/><br/>

                    <input type="submit" value="Valider les modifications" />
                </form>
                              
                <h4>Membre depuis le : {dateParser(company.createdAt)/* date de la db formatée */}</h4>
            </div>
        </div> 
    )
}
export default UpdateProfil;