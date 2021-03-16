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
                <img src={student.picture} alt="user-pic" />
                <UploadImg /> 
                <br/>
                <h2>About you</h2>
                {updateForm === false && (
                        <div className="student-info" onClick={(e)=> setUpdateForm(true)}>
                            <p><h4>Bio</h4>{student.bio}</p>
                            <p> <h4>internshipStart</h4> {student.internshipStart}</p>
                            <p><h4>internshipDuration</h4>{student.internshipDuration}</p>
                            <p><h4>school</h4>{student.school}</p>
                            <p><h4>studyOption</h4>{student.studyOption}</p>
                            <p><h4>currentStudyLevel</h4>{student.currentStudyLevel}</p>
                            <p><h4>portfolio</h4>{student.portfolio}</p>
                        </div>
                )}
                { updateForm === true && (
                <form action="" onSubmit={handleUpdate} id="student-update-form">
                    <label htmlFor="bio" ><h4>Bio</h4> </label>                 
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        onChange={(e)=> setBio(e.target.value)}
                        defaultValue={student.bio}
                    />
                    <br/><br/>
                    <label htmlFor="internshipStart" ><h4>internshipStart</h4> </label>
                    <input
                        type="text"
                        name="internshipStart"
                        id="internshipStart"
                        onChange={(e)=> setInternshipStart(e.target.value)}
                        defaultValue={student.internshipStart}                      
                    />
                    <br/><br/>
                    <label htmlFor="internshipDuration" ><h4>internshipDuration</h4></label>
                    <input
                        type="text"
                        name="internshipDuration"
                        id="internshipDuration"
                        onChange={(e)=> setInternshipDuration(e.target.value)}
                        defaultValue={student.internshipDuration}
                    />
                    <br/><br/>
                    <label htmlFor="school" ><h4>school</h4></label>
                    <input
                        type="text"
                        name="school"
                        id="school"
                        onChange={(e)=> setSchool(e.target.value)}
                        defaultValue={student.school}
                    />
                    <br/><br/>
                    <label htmlFor="studyOption" ><h4>studyOption</h4></label>
                    <input
                        type="text"
                        name="studyOption"
                        id="studyOption"
                        onChange={(e)=> setStudyOption(e.target.value)}
                        defaultValue={student.studyOption}
                    />
                    <br/><br/>
                    <label htmlFor="currentStudyLevel" ><h4>currentStudyLevel</h4></label>
                    <input
                        type="text"
                        name="currentStudyLevel"
                        id="currentStudyLevel"
                        onChange={(e)=> setCurrentStudyLevel(e.target.value)}
                        defaultValue={student.currentStudyLevel}
                    />
                    <br/><br/>
                    <label htmlFor="portfolio" ><h4>portfolio</h4></label>
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
                              
                <h4>Membre depuis le : {dateParser(student.createdAt)/* date de la db formatée */}</h4>    
            </div>
        </div> 
        
    )
}
export default UpdateProfil;