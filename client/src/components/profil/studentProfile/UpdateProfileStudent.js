import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateStudent } from '../../../actions/student.action';
import UploadImg from './UploadImgStudent';
import { dateParser } from '../../utils';


 
// Component sous la barre Navbar qu'on récupère dans la page '/profil' quand user est connecté
const UpdateProfil = ()=>{
    const student = useSelector((state)=>state.studentReducer);// On récupère les datas dans le store
    const [bio, setBio] = useState(student.bio);
    const [internshipStart, setInternshipStart] = useState(student.internshipStart);
    const [internshipDuration, setInternshipDuration] = useState(student.internshipDuration);
    const [school, setSchool] = useState(student.school);
    const [studyOption, setStudyOption] = useState(student.studyOption);
    const [currentStudyLevel, setCurrentStudyLevel] = useState(student.currentStudyLevel);
    const [portfolio, setPortfolio] = useState(student.portfolio);
    const [updateForm, setUpdateForm] = useState(false); // pour gérer l'affichage conditionnel
    const dispatch = useDispatch()

    const handleUpdate= ()=>{
        dispatch(updateStudent(student._id, bio, internshipStart, internshipDuration, school, studyOption, currentStudyLevel, portfolio)); // déclanche l'action updateBio
        setUpdateForm(false); // permet de changer l'affichage
    }

    // On affiche la LeftNav, l'uploadImg et la Bio
    return (
        <div className="profil-container">
            {/* <LeftNav/> */}
            <h1> Profil de {student.firstname}</h1>
            <div className="update-container" >
                <h3>Photo de profil</h3>
                <img src={student.picture} alt="user-pic" style={{minWidth:50, maxWidth:200, width:150, height:150, minHeight:50, maxHeight:200}}/>
                <UploadImg /> 
                <br/>
                <h2>About you</h2>
                {updateForm === false && (
                        <div className="student-info" onClick={(e)=> setUpdateForm(true)}>
                            <p><b>Bio</b> :{student.bio}</p>
                            <p> <b>internshipStart</b> :{student.internshipStart}</p>
                            <p><b>internshipDuration</b> :{student.internshipDuration}</p>
                            <p><b>school</b> :{student.school}</p>
                            <p><b>studyOption</b> :{student.studyOption}</p>
                            <p><b>currentStudyLevel</b> :{student.currentStudyLevel}</p>
                            <p><b>portfolio</b> :{student.portfolio}</p>
                        </div>
                )}
                { updateForm === true && (
                <form action="" onSubmit={handleUpdate} id="student-update-form">
                    <label htmlFor="bio" ><b>Bio</b> </label>                 
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        onChange={(e)=> setBio(e.target.value)}
                        defaultValue={student.bio}
                    />
                    <br/><br/>
                    <label htmlFor="internshipStart" ><b>internshipStart</b> </label>
                    <input
                        type="text"
                        name="internshipStart"
                        id="internshipStart"
                        onChange={(e)=> setInternshipStart(e.target.value)}
                        defaultValue={student.internshipStart}                      
                    />
                    <br/><br/>
                    <label htmlFor="internshipDuration" ><b>internshipDuration</b></label>
                    <input
                        type="text"
                        name="internshipDuration"
                        id="internshipDuration"
                        onChange={(e)=> setInternshipDuration(e.target.value)}
                        defaultValue={student.internshipDuration}
                    />
                    <br/><br/>
                    <label htmlFor="school" ><b>school</b></label>
                    <input
                        type="text"
                        name="school"
                        id="school"
                        onChange={(e)=> setSchool(e.target.value)}
                        defaultValue={student.school}
                    />
                    <br/><br/>
                    <label htmlFor="studyOption" ><b>studyOption</b></label>
                    <input
                        type="text"
                        name="studyOption"
                        id="studyOption"
                        onChange={(e)=> setStudyOption(e.target.value)}
                        defaultValue={student.studyOption}
                    />
                    <br/><br/>
                    <label htmlFor="currentStudyLevel" ><b>currentStudyLevel</b></label>
                    <input
                        type="text"
                        name="currentStudyLevel"
                        id="currentStudyLevel"
                        onChange={(e)=> setCurrentStudyLevel(e.target.value)}
                        defaultValue={student.currentStudyLevel}
                    />
                    <br/><br/>
                    <label htmlFor="portfolio" ><b>portfolio</b></label>
                    <input
                        type="text"
                        name="currentStudyLevel"
                        id="portfolio"
                        onChange={(e)=> setPortfolio(e.target.value)}
                        defaultValue={student.portfolio}
                    />
                    <br/><br/>
                    
                    <input type="submit" value="Valider les modifications" />
                </form>
                )}
                              
                <i><b>Membre depuis le</b> : {dateParser(student.createdAt)/* date de la db formatée */} </i>   
            </div>
        </div> 
        
    )
}
export default UpdateProfil;