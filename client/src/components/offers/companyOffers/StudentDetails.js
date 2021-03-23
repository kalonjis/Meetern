import React from 'react';
import { useSelector } from 'react-redux';

const StudentDetails = (id)=>{
    const student = useSelector((state)=>state.detailsReducer);
    console.log(student)

    return (
        <div className="student-info" style={{border:  '2px solid blue', width:'30%'}} >
            <h2>{student.firstname +" "+ student.lastname}</h2>
            <img src={student.picture} alt="student's pic" style={{minWidth:50, maxWidth:200, width:150, height:150, minHeight:50, maxHeight:200}}/>
            <p>Bio : {student.bio}</p>
            <p> internshipStart:  {student.internshipStart}</p>
            <p>internshipDuration: {student.internshipDuration}</p>
            <p>school: {student.school}</p>
            <p>studyOption: {student.studyOption}</p>
            <p>currentStudyLevel: {student.currentStudyLevel}</p>
            <p>portfolio: {student.portfolio}</p>
        </div>
    )
}
export default StudentDetails