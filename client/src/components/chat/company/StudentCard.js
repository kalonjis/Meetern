import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const StudentCard = ({id}) => {
    const allStudents = useSelector( state => state.allStudentsReducer)
    
    const [student, setStudent] = useState([])

    useEffect(()=>{
        setStudent((allStudents.filter ( student => student._id === id))[0])
    },[id, allStudents])

    console.log(student)


    return (
        <li key={id}>
            <img src={student.picture} alt="pic" style={{width: "30px" , height: "30px"}}/>
            <span> {student.firstname}</span>
        </li>
    )
}

export default StudentCard
