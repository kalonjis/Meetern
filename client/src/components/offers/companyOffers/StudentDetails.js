import React from 'react';
// import { useSelector } from 'react-redux';

const StudentDetails = ({student})=>{
    // const student = useSelector((state)=>state.detailsReducer);
    console.log(student)

    return (
        <div className="student-info" style={{border:  '2px solid blue', width:'30%'}} >
            <h2>{student.firstname +" "+ student.lastname}</h2>
            <img src={student.picture} alt="student's pic" style={{width: "30px" , height: "30px"}}/>
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