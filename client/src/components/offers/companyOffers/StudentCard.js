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


    return (
        <div className="student-info" style={{border:  '2px solid blue', width:'30%'}} >
            <h2>{student.firstname +" "+ student.lastname}</h2>
            <img src={student.picture} alt="student's pic" style={{width: "50px" , height: "50px"}}/>
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
export default StudentCard