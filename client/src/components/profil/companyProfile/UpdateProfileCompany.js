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
    const [updateForm, setUpdateForm] = useState(false)

    const dispatch = useDispatch() // on instancie la methode pour pouvoir l'utiliser ds le callback

    const handleUpdate=(e)=>{
        e.preventDefault();
        dispatch(updateCompany(company._id, bio, sector, companyType, phone, webSite, corporateWear)); // déclanche l'action updateBio
        setUpdateForm(false)
    }


    // On affiche la LeftNav, l'uploadImg et la Bio
    return (
        <div className="profil-container">
            {/* <LeftNav/> */}
            <h1> Profil de {company.companyName}</h1>
            <div className="update-container" >
                <h3>Photo de profil</h3>
                <img src={company.picture} alt="user-pic" style={{minWidth:50, maxWidth:200, width:150, height:150, minHeight:50, maxHeight:200}}/>
                <UploadImg />
                <br/>
                <h2>About your company</h2>
                {updateForm === false && (
                        <div className="company-info" onClick={(e)=> setUpdateForm(true)}>
                            <p><h4>Bio</h4>{company.bio}</p>
                            <p> <h4>Sector</h4> {company.sector}</p>
                            <p><h4>Company Type</h4>{company.companyType}</p>
                            <p><h4>Phone</h4>{company.phone}</p>
                            <p><h4>Website</h4>{company.webSite}</p>
                            <p><h4>Dress Code</h4>{company.corporateWear}</p>
                        </div>
                )}
                { updateForm === true && (
                <form action="" onSubmit={handleUpdate} id="company-update-form">
                    <label htmlFor="bio" ><h4>Bio</h4> </label>                 
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        onChange={(e)=> setBio(e.target.value)}
                        defaultValue={company.bio}
                    />
                    <br/><br/>
                    <label htmlFor="sector" ><h4>Sector</h4> </label>
                    <input
                        type="text"
                        name="sector"
                        id="sector"
                        onChange={(e)=> setSector(e.target.value)}
                        defaultValue={company.sector}                      
                    />
                    <br/><br/>
                    <label htmlFor="companyType" ><h4>Company Type</h4></label>
                    <input
                        type="text"
                        name="companyType"
                        id="companyType"
                        onChange={(e)=> setCompanyType(e.target.value)}
                        defaultValue={company.companyType}
                    />
                    <br/><br/>
                    <label htmlFor="phone" ><h4>Phone</h4></label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={(e)=> setPhone(e.target.value)}
                        defaultValue={company.phone}
                    />
                    <br/><br/>
                    <label htmlFor="webSite" ><h4>Website</h4></label>
                    <input
                        type="text"
                        name="webSite"
                        id="webSite"
                        onChange={(e)=> setWebSite(e.target.value)}
                        defaultValue={company.webSite}
                    />
                    <br/><br/>
                    <label htmlFor="corporateWear" ><h4>Dress Code</h4></label>
                    <input
                        type="text"
                        name="corporateWear"
                        id="corporateWear"
                        onChange={(e)=> setCorporateWear(e.target.value)}
                        defaultValue={company.corporateWear}
                    />
                    <br/><br/>
                    <input type="submit" value="Valider les modifications" />
                </form>
                )}
                              
                <h4>Membre depuis le : {dateParser(company.createdAt)/* date de la db formatée */}</h4>
            </div>
        </div> 
    )
}
export default UpdateProfil;