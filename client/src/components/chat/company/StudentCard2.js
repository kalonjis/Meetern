import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const StudentCard2 = ({id}) => {
    const allStudents = useSelector( state => state.allStudentsReducer)
    const [student, setStudent] = useState([])

    useEffect(()=>{
        setStudent((allStudents.filter ( student => student._id === id))[0])
    },[id, allStudents])

    return (
        <div>
            <img src={window.location.origin + '/uploads/profil/students/'+student.firstname +'.jpg'} alt="pic" style={{width: "30px" , height: "30px"}}/>
            <span> {student.firstname}</span>
        </div>
    )
}

export default StudentCard2
