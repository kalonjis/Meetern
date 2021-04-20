import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../utils';


const StudentCard = ({id})=>{

    const allStudents = useSelector( state => state.allStudentsReducer)
    
    const [student, setStudent] = useState([])

    useEffect(()=>{
        if(!isEmpty(allStudents)){
           return setStudent((allStudents.filter ( student => student._id === id))[0])
        }
    },[id, allStudents])
    console.log(student.picture)

    return (
        <div className="studentCard-container">
            <div className="studentCard-container-top">
                <img src={window.location.origin + '/uploads/profil/students/'+student.firstname +'.jpg'} alt="student's pic" style={{width: "50px" , height: "50px"}}/>
                <h3>{student.firstname +" "+ student.lastname}</h3>
            </div>
            <div className="studentCard-student-details">
                <p>Bio : {student.bio}</p>
                <p> internshipStart:  {student.internshipStart}</p>
                <p>internshipDuration: {student.internshipDuration}</p>
                <p>school: {student.school}</p>
                <p>studyOption: {student.studyOption}</p>
                <p>currentStudyLevel: {student.currentStudyLevel}</p>
                <p>portfolio: <a href={student.portfolio}>{student.portfolio}</a></p>
            </div>
        </div>
    )
}
export default StudentCard